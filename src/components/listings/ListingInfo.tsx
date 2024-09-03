"use client";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import profile from "@/assets/profile.jpeg";
import { Separator } from "../ui/separator";
import ListingCategory from "./ListingCategory";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
	ssr: false,
});

interface ListingInfoProps {
	user: SafeUser | null;
	description: string;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
}

function ListingInfo({
	user,
	description,
	category,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
}: ListingInfoProps) {
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.latlng;

	const profileSrc = user?.image ?? profile;

	return (
		<div className="col-span-4 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-semibold flex items-center gap-2">
					<div>Hosted by {user?.name}</div>
					<div className="w-8 h-8 rounded-full overflow-hidden relative">
						<Image
							src={profileSrc}
							alt="Profile Pic"
							className="w-full h-full object-cover"
							fill
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{guestCount} rooms</div>
					<div>{guestCount} bathrooms</div>
				</div>
			</div>
			<Separator />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<Separator />
			<div className="text-lg font-light text-neutral-500">
				{description}
			</div>
			<Separator />
			<Map center={coordinates} />
		</div>
	);
}

export default ListingInfo;
