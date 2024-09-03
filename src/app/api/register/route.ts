import prisma from "@/lib/prismadb";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { name, email, password } = await req.json();

	const hashedPassword = await bcryptjs.hash(password, 12);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
		},
	});

	return NextResponse.json(user, { status: 201 });
}
