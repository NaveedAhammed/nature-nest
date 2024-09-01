"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryItem from "./CategoryItem";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
	{
		label: "Beach",
		icon: TbBeach,
		description: "This property is close to the beach",
	},
	{
		label: "Windmills",
		icon: GiWindmill,
		description: "This property has windmills",
	},
	{
		label: "Modern",
		icon: MdOutlineVilla,
		description: "This property is modern!",
	},
	{
		label: "Countryside",
		icon: TbMountain,
		description: "This property is in the countryside!",
	},
	{
		label: "Pools",
		icon: TbPool,
		description: "This property has a pool",
	},
	{
		label: "Islands",
		icon: GiIsland,
		description: "This property is modern!",
	},
	{
		label: "Lake",
		icon: GiBoatFishing,
		description: "This property is close to a lake!",
	},
	{
		label: "Skiing",
		icon: FaSkiing,
		description: "This property has skiing activities!",
	},
	{
		label: "Castles",
		icon: GiCastle,
		description: "This property is in a castle!",
	},
	{
		label: "Camping",
		icon: GiForestCamp,
		description: "This property has camping activites!",
	},
	{
		label: "Arctic",
		icon: BsSnow,
		description: "This property is in arctic zone!",
	},
	{
		label: "Cave",
		icon: GiCaveEntrance,
		description: "This property is in a cave!",
	},
	{
		label: "Desert",
		icon: GiCactus,
		description: "This property is in desert!",
	},
	{
		label: "Barns",
		icon: GiBarn,
		description: "This property is in the barn!",
	},
	{
		label: "Lux",
		icon: IoDiamond,
		description: "This property luxurious!",
	},
];

function Categories() {
	const params = useSearchParams();

	const category = params?.get("category");
	const pathname = usePathname();

	const isMainPage = pathname === "/";

	if (!isMainPage) {
		return null;
	}

	return (
		<div className="border-b">
			<div className="overflow-x-auto max-w-[1280px] flex items-center justify-between mx-auto px-4 xl:px-0">
				{categories.map((item) => (
					<CategoryItem
						item={item}
						key={item.label}
						selected={category === item.label}
					/>
				))}
			</div>
		</div>
	);
}

export default Categories;
