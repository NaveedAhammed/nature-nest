import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await req.json();

	const { listingId, startDate, endDate, totalPrice } = body;

	console.log(listingId, startDate, endDate, totalPrice);

	if (!listingId || !startDate || !endDate || !totalPrice) {
		return NextResponse.error();
	}

	try {
		const listingAndReservation = await prisma.listing.update({
			where: {
				id: listingId,
			},
			data: {
				reservations: {
					create: {
						userId: currentUser.id,
						startDate,
						endDate,
						totalPrice,
					},
				},
			},
		});

		return NextResponse.json(listingAndReservation);
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	}
}
