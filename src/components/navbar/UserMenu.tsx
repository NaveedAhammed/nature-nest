"use client";

import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import profile from "@/assets/profile.jpeg";
import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
	const profileSrc = currentUser?.image ?? profile;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center border p-3 sm:px-2 sm:py-1 gap-1 rounded-full">
					<MenuIcon size={18} />
					<div className="relative rounded-full overflow-hidden w-7 h-7 hidden sm:block">
						<Image
							src={profileSrc}
							alt="Profile Pic"
							fill
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{!currentUser ? (
					<React.Fragment>
						<DropdownMenuItem>
							<Link href="/login">Log in</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/signup">Sign up</Link>
						</DropdownMenuItem>
					</React.Fragment>
				) : (
					<React.Fragment>
						<DropdownMenuItem>
							<Link href="/bookings">Bookings</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/wishlists">Wishlists</Link>
						</DropdownMenuItem>
					</React.Fragment>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href="/listing">List your property</Link>
				</DropdownMenuItem>
				{currentUser && (
					<DropdownMenuItem>
						<Link href="/account">Account</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem>Help center</DropdownMenuItem>
				{currentUser && (
					<React.Fragment>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							Log out
						</DropdownMenuItem>
					</React.Fragment>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
