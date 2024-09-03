"use client";

import useCountries from "@/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { Button } from "../ui/button";

interface ListingCardProps {
	data: SafeListing;
	reservation?: SafeReservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
}

function ListingCard({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
	currentUser,
}: ListingCardProps) {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) return;

			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) return null;

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div
			className="col-span-1 cursor-pointer group"
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className="flex flex-col w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						alt={data.title}
						src={data.imageSrc}
						className="object-cover group-hover:scale-110 transition"
						fill
					/>
					<div className="absolute top-3 right-3">
						<HeartButton
							listingId={data.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="text-neutral-600 text-sm mb-2">
					{reservationDate || data.category}
				</div>
				<div className="flex items-center gap-1">
					<div className="font-semibold">${price}</div>
					{!reservation && <div className="font-light">night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						size="sm"
						onClick={handleCancel}
						className="mt-2"
					>
						{actionLabel}
					</Button>
				)}
			</div>
		</div>
	);
}

export default ListingCard;
