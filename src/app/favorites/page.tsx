import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesList from "./FavoritesList";

async function Favorites() {
	const currentUser = await getCurrentUser();
	const listings = await getFavoriteListings();

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No favorites found"
				subTitle="Looks like you have no favorite listings."
			/>
		);
	}

	return <FavoritesList listings={listings} currentUser={currentUser} />;
}

export default Favorites;
