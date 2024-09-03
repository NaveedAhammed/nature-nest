"use client";

import { categories } from "@/components/categories/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { useToast } from "@/hooks/use-toast";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";

interface ListingDetailsProps {
	reservations?: SafeReservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

function ListingDetails({
	reservations = [],
	listing,
	currentUser,
}: ListingDetailsProps) {
	const router = useRouter();
	const { toast } = useToast();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			return router.push("/login");
		}

		setIsLoading(true);

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing.id,
			})
			.then((res) => {
				toast({
					title: "Listing reserved!",
				});
				setDateRange(initialDateRange);
				router.push("/trips");
				router.refresh();
			})
			.catch((err) => {
				toast({
					title: "Something went wrong",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [
		currentUser,
		dateRange.endDate,
		dateRange.startDate,
		listing.id,
		router,
		toast,
		totalPrice,
	]);

	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	return (
		<div className="max-w-[1280px] mx-auto w-full py-8">
			<div className="flex flex-col gap-6">
				<ListingHead
					title={listing.title}
					imageSrc={listing.imageSrc}
					locationValue={listing.locationValue}
					id={listing.id}
					currentUser={currentUser}
				/>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						guestCount={listing.guestCount}
						bathroomCount={listing.bathroomCount}
						locationValue={listing.locationValue}
					/>
					<div className="order-first mb-10 md:order-last md:col-span-3">
						<ListingReservation
							price={listing.price}
							totalPrice={totalPrice}
							onChangeDate={(value) => setDateRange(value)}
							dateRange={dateRange}
							onSubmit={onCreateReservation}
							disabled={isLoading}
							disabledDates={disabledDates}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingDetails;
