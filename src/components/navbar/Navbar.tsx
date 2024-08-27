import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import Search from "./Search";
import UserMenu from "./UserMenu";

function Navbar() {
	return (
		<header className="bg-white border-b h-16 flex items-center">
			<nav className="max-w-[1366px] mx-auto w-full flex items-center justify-between">
				<Link href="/" className="flex items-center gap-1">
					<Image
						src={logo}
						alt="NatureNest Logo"
						className="rounded-full w-11 h-11"
					/>
					<span className="text-2xl font-bold text-primary">
						NatureNest
					</span>
				</Link>
				<Search />
				<div className="flex items-center gap-4">
					<Button variant="outline">List your property</Button>
					<Link href="/login">
						<Button variant="link">Login</Button>
					</Link>
					<UserMenu />
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
