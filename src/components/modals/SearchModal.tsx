"use client";

import { useCallback, useMemo, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import CountrySelect, { CountrySelectValue } from "../ui/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import { Separator } from "../ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../Calendar";
import Search from "../navbar/Search";

enum STEPS {
	LOACTION = 0,
	DATE = 1,
	INFO = 2,
}

function SearchModal() {
	const router = useRouter();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOACTION);
	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit = useCallback(() => {
		if (step !== STEPS.INFO) return onNext();

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOACTION);
		router.push(url);
	}, [
		bathroomCount,
		dateRange.endDate,
		dateRange.startDate,
		guestCount,
		location?.value,
		params,
		roomCount,
		router,
		step,
	]);

	let bodyContent = (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Where do you wanna go?</DialogTitle>
				<DialogDescription>
					Find the perfect location!
				</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col gap-4">
				<CountrySelect
					value={location}
					onChange={(value) => setLocation(value)}
				/>
				<Map center={location?.latlng} />
			</div>
			<DialogFooter className="flex items-center gap-8">
				<Button className="w-full" variant="outline" onClick={onBack}>
					Prev
				</Button>
				<Button className="w-full" onClick={onNext}>
					Next
				</Button>
			</DialogFooter>
		</DialogContent>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<DialogContent>
				<DialogHeader>
					<DialogTitle>When do you plan to go?</DialogTitle>
					<DialogDescription>
						Make sure everyone is free!
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-8">
					<Calendar
						value={dateRange}
						onChange={(value) => setDateRange(value.selection)}
					/>
				</div>
				<DialogFooter className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Prev
					</Button>
					<Button className="w-full" onClick={onNext}>
						Next
					</Button>
				</DialogFooter>
			</DialogContent>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<DialogContent>
				<DialogHeader>
					<DialogTitle>More information</DialogTitle>
					<DialogDescription>
						Who all are coming with you?
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-8">
					<Counter
						title="Guests"
						subTitle="How many guests are coming?"
						value={guestCount}
						onChange={(value) => setGuestCount(value)}
					/>
					<Separator className="my-2" />
					<Counter
						title="Rooms"
						subTitle="How many rooms do you need?"
						value={roomCount}
						onChange={(value) => setRoomCount(value)}
					/>
					<Separator className="my-2" />
					<Counter
						title="Bathrooms"
						subTitle="How many bathrooms do you need?"
						value={bathroomCount}
						onChange={(value) => setBathroomCount(value)}
					/>
				</div>
				<DialogFooter className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Prev
					</Button>
					<DialogClose asChild>
						<Button className="w-full" onClick={onSubmit}>
							Search
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		);
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Search />
			</DialogTrigger>
			{bodyContent}
		</Dialog>
	);
}

export default SearchModal;
