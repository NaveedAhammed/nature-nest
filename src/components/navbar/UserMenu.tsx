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

function UserMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center border p-3 sm:px-2 sm:py-1 rounded-full">
					<MenuIcon size={18} />
					<Image
						src={profile}
						alt="Profile Pic"
						className="rounded-full overflow-hidden w-7 h-7 hidden sm:block"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link href="/login">Log in</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href="/signup">Sign up</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href="/listing">List your property</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
