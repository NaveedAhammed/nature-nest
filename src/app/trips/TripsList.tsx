"use client";

import ListingCard from "@/components/listings/ListingCard";
import { useToast } from "@/hooks/use-toast";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface TripsListProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

function TripsList({ reservations, currentUser }: TripsListProps) {
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
				<h1 className="text-2xl font-bold">Trips</h1>
				<p className="text-sm">
					Where you&apos;ve been and where you&apos;re going
				</p>
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
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</div>
	);
}

export default TripsList;
