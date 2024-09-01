"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface EmptyStateProps {
	title?: string;
	subTitle?: string;
	showReset?: boolean;
}

function EmptyState({
	title = "No exact matches",
	subTitle = "Try changing or removing some of your filters",
	showReset,
}: EmptyStateProps) {
	const router = useRouter();

	return (
		<div className="h-[60vh] flex flex-col justify-center gap-2 items-center">
			<h1>{title}</h1>
			<p>{subTitle}</p>
			<div className="w-48 mt-4">
				{showReset && (
					<Button onClick={() => router.push("/")}>
						Remove all filters
					</Button>
				)}
			</div>
		</div>
	);
}

export default EmptyState;
