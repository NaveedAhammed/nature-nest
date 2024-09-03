"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
	error: Error;
}

function ErrorState({ error }: ErrorStateProps) {
	useEffect(() => {
		console.log(error);
	}, [error]);
	return <EmptyState title="Uh Oh" subTitle="Something went wrong!" />;
}

export default ErrorState;
