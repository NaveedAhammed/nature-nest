import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";
import RentModal from "../modals/RentModal";

interface NavbarProps {
	currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
	return (
		<header className="bg-white border-b h-16 flex items-center">
			<nav className="max-w-[1280px] mx-auto w-full flex items-center justify-between px-4 xl:px-0 gap-4 sm:gap-0">
				<Link href="/" className="hidden items-center gap-1 sm:flex">
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
					<RentModal />
					{!currentUser && (
						<Link href="/login" className="hidden lg:block">
							<Button variant="link">Login</Button>
						</Link>
					)}
					<UserMenu currentUser={currentUser} />
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
