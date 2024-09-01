"use client";

import { CategoryItem } from "@/types";

interface CategoryInputProps {
	item: CategoryItem;
	selected?: boolean;
	onClick: (value: string) => void;
}

function CategoryInput({ item, selected, onClick }: CategoryInputProps) {
	const { label, icon: Icon } = item;
	return (
		<div
			onClick={() => onClick(label)}
			className={`rounded-xl border p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
				selected ? "border-black" : "border-neutral-200"
			}`}
		>
			<Icon size={22} />
			<span className="font-semibold text-sm">{label}</span>
		</div>
	);
}

export default CategoryInput;
