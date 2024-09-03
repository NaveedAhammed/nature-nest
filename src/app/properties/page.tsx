import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesList from "./PropertiesList";
import getListings from "../actions/getListings";

async function Properties() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subTitle="Please Login" />;
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No properties found"
				subTitle="Looks like you have no properties."
			/>
		);
	}

	return <PropertiesList listings={listings} currentUser={currentUser} />;
}

export default Properties;
