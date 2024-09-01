import EmptyState from "@/components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "@/components/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

async function Home() {
	const listings = await getListings();
	const currentUser = await getCurrentUser();

	if (listings?.length === 0) {
		return <EmptyState showReset />;
	}

	return (
		<div className="max-w-[1280px] mx-auto pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
			{listings?.map((listing) => (
				<ListingCard
					currentUser={currentUser}
					data={listing}
					key={listing.id}
				/>
			))}
		</div>
	);
}

export default Home;
