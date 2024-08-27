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
				<div className="flex items-center border px-2 py-1 rounded-full">
					<MenuIcon size={18} />
					<Image
						src={profile}
						alt="Profile Pic"
						className="rounded-full overflow-hidden w-7 h-7"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem className="hover:text-primary hover:bg-secondary">
					<Link href="/login">Log in</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:text-primary hover:bg-secondary">
					<Link href="/signup">Sign up</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="hover:text-primary hover:bg-secondary">
					<Link href="/listing">List your property</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:text-primary hover:bg-secondary">
					Subscription
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
