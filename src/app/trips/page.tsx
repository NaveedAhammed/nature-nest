import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsList from "./TripsList";

async function Trips() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please Login" />;
	}

	const reservations = await getReservations({
		userId: currentUser.id,
	});

	if (reservations.length === 0) {
		return (
			<EmptyState
				title="No trips found"
				subTitle="Looks like you havent reserved any trips."
			/>
		);
	}

	return <TripsList reservations={reservations} currentUser={currentUser} />;
}

export default Trips;
