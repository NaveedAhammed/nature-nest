import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingDetails from "./ListingDetails";

interface IParams {
	listingId?: string;
}

async function Listing({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return <EmptyState />;
	}

	return (
		<>
			<ListingDetails listing={listing} currentUser={currentUser} />
		</>
	);
}

export default Listing;
