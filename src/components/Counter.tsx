"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
	title: string;
	subTitle: string;
	value: number;
	onChange: (value: number) => void;
}

function Counter({ title, subTitle, onChange, value }: CounterProps) {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [onChange, value]);

	const onReduce = useCallback(() => {
		if (value === 1) return;

		onChange(value - 1);
	}, [onChange, value]);

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex flex-col sm:flex-row sm:justify-between w-full">
				<div className="flex flex-col">
					<div className="font-medium">{title}</div>
					<div className="font-light text-gray-600 text-sm">
						{subTitle}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div
						onClick={onReduce}
						className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
					>
						<AiOutlineMinus />
					</div>
					<div className="font-light text-xl text-neutral-600">
						{value}
					</div>
					<div
						onClick={onAdd}
						className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
					>
						<AiOutlinePlus />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Counter;
