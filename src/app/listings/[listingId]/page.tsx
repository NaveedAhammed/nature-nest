import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingDetails from "./ListingDetails";
import getReservations from "@/app/actions/getReservations";

interface IParams {
	listingId?: string;
}

async function Listing({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations(params);

	if (!listing) {
		return <EmptyState />;
	}

	return (
		<ListingDetails
			listing={listing}
			reservations={reservations}
			currentUser={currentUser}
		/>
	);
}

export default Listing;
