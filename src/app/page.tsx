import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
	searchParams: IListingsParams;
}

async function Home({ searchParams }: HomeProps) {
	const listings = await getListings(searchParams);
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
