"use client";

import { Range } from "react-date-range";
import { Separator } from "../ui/separator";
import Calendar from "../Calendar";
import { Button } from "../ui/button";

interface ListingReservationProps {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
}

function ListingReservation({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabledDates,
	disabled,
}: ListingReservationProps) {
	return (
		<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
			<div className="flex items-center gap-1 p-4">
				<div className="text-2xl font-semibold">${price}</div>
				<div className="font-light text-neutral-600">night</div>
			</div>
			<Separator />
			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={(value) => onChangeDate(value.selection)}
			/>
			<Separator />
			<div className="p-4 flex items-center justify-between font-semibold text-lg">
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
			<div className="p-4">
				<Button
					disabled={disabled}
					onClick={onSubmit}
					size="lg"
					className="w-full"
				>
					Reserve
				</Button>
			</div>
		</div>
	);
}

export default ListingReservation;
