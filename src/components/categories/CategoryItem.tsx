import { CategoryItem as Item } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface CategoryItemProps {
	item: Item;
	selected?: boolean;
}

function CategoryItem({ item, selected }: CategoryItemProps) {
	const { icon: Icon, label, description } = item;

	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery: any = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery = {
			...currentQuery,
			category: label,
		};

		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, params, router]);

	return (
		<div
			className={`flex flex-col items-center justify-center gap-1 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
				selected ? "border-b-neutral-800" : "border-b-transparent"
			} ${selected ? "text-neutral-800" : "text-neutral-500"}`}
			title={description}
			onClick={handleClick}
		>
			<Icon size={20} />
			<span className="font-medium text-xs">{label}</span>
		</div>
	);
}

export default CategoryItem;
