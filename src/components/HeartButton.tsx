"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

function HeartButton({ listingId, currentUser }: HeartButtonProps) {
	const { hasFavoirted, toggleFavorite } = useFavorite(
		listingId,
		currentUser
	);

	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart size={26} className="fill-white absolute" />
			<AiFillHeart
				size={26}
				className={`${
					hasFavoirted ? "fill-rose-500" : "fill-neutral-500/70"
				}`}
			/>
		</div>
	);
}

export default HeartButton;
