"use client";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProp {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: SafeUser | null;
}

function ListingHead({
	title,
	locationValue,
	imageSrc,
	id,
	currentUser,
}: ListingHeadProp) {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-semibold">{title}</h1>
			<p>{`${location?.region}, ${location?.label}`}</p>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					alt="Image"
					src={imageSrc}
					className="object-cover w-full"
					fill
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</div>
	);
}

export default ListingHead;
