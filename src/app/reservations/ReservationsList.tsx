"use client";

import ListingCard from "@/components/listings/ListingCard";
import { useToast } from "@/hooks/use-toast";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ReservationListProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

function ReservationsList({ reservations, currentUser }: ReservationListProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");
	const { toast } = useToast();

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast({
						title: "Reservation cancelled",
					});
					router.refresh();
				})
				.catch((err: any) => {
					console.log(err);
					toast({
						title: "Something went wrong",
					});
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
				<h1 className="text-2xl font-bold">Reservations</h1>
				<p className="text-sm">Bookings on your properties</p>
			</div>
			<div className="mt-10 grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</div>
	);
}

export default ReservationsList;
