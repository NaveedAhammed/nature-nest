"use client";

import ListingCard from "@/components/listings/ListingCard";
import { useToast } from "@/hooks/use-toast";
import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface TripsListProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

function TripsList({ listings, currentUser }: TripsListProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");
	const { toast } = useToast();

	const onDelete = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast({
						title: "Listing deleted",
					});
					router.refresh();
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router, toast]
	);

	return (
		<div className="max-w-[1280px] mx-auto w-full py-8">
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold">Properties</h1>
				<p className="text-sm">List of your properties</p>
			</div>
			<div className="mt-10 grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</div>
	);
}

export default TripsList;
