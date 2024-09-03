"use client";

import ListingCard from "@/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";

interface FavoritesListProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

function FavoritesList({ listings, currentUser }: FavoritesListProps) {
	return (
		<div className="max-w-[1280px] mx-auto w-full py-8">
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold">Favorites</h1>
				<p className="text-sm">List of places you have favorited</p>
			</div>
			<div className="mt-10 grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</div>
	);
}

export default FavoritesList;
