import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const cureentUser = await getCurrentUser();

	if (!cureentUser) {
		return NextResponse.error();
	}

	const body = await req.json();
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		location,
		price,
	} = body;

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			price: parseInt(price),
			userId: cureentUser.id,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			imageSrc,
		},
	});

	return NextResponse.json(listing);
}
