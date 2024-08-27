import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
