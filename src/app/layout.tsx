import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "./actions/getCurrentUser";
import Categories from "@/components/categories/Categories";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: {
		template: "%s | NatureNest",
		default: "NatureNest",
	},
	description:
		"This app helps you discover the best nature spots around you.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Navbar currentUser={currentUser} />
				<Categories />
				{children}
				<Toaster />
			</body>
		</html>
	);
}
