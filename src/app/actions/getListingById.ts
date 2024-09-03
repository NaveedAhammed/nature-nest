import prisma from "@/lib/prismadb";

interface IParams {
	listingId?: string;
}

export default async function getListingById(params: IParams) {
	try {
		const { listingId } = params;
		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId,
			},
			include: {
				user: true,
			},
		});

		if (!listing) {
			return null;
		}

		return {
			...listing,
			createdAt: listing.createdAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.createdAt.toISOString(),
				updatedAt: listing.updatedAt.toISOString(),
				emailVerified:
					listing.user.emailVerified?.toISOString() || null,
			},
		};
	} catch (err: any) {
		throw new Error(err);
	}
}
