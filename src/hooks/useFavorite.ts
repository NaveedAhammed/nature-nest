"use client";

import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useToast } from "./use-toast";

function useFavorite(listingId: string, currentUser?: SafeUser | null) {
	const router = useRouter();
	const { toast } = useToast();

	const hasFavoirted = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return router.push("/login");
			}

			try {
				let request;

				if (hasFavoirted) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast({
					title: "Success",
				});
			} catch (err) {
				console.log(err);
				toast({
					title: "Something went wrong",
				});
			}
		},
		[currentUser, listingId, hasFavoirted, toast, router]
	);

	return {
		hasFavoirted,
		toggleFavorite,
	};
}

export default useFavorite;
