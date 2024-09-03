import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsList from "./ReservationsList";

async function Reservations() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please login" />;
	}

	const reservations = await getReservations({
		authorId: currentUser.id,
	});

	if (reservations.length === 0) {
		<EmptyState
			title="No reservation found"
			subTitle="Looks like you have no reservations on your properties"
		/>;
	}

	return (
		<ReservationsList
			reservations={reservations}
			currentUser={currentUser}
		/>
	);
}

export default Reservations;
