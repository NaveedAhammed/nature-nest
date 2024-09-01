"use client";

import { categories } from "@/components/categories/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { useMemo } from "react";

interface ListingDetailsProps {
	reservations?: Reservation[];
	listing: Listing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

function ListingDetails({
	reservations,
	listing,
	currentUser,
}: ListingDetailsProps) {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	return (
		<div className="max-w-[1280px] mx-auto w-full">
			<div className="flex flex-col gap-6">
				<ListingHead
					title={listing.title}
					imageSrc={listing.imageSrc}
					locationValue={listing.locationValue}
					id={listing.id}
					currentUser={currentUser}
				/>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						guestCount={listing.guestCount}
						bathroomCount={listing.bathroomCount}
						locationValue={listing.locationValue}
					/>
				</div>
			</div>
		</div>
	);
}

export default ListingDetails;
