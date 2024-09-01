"use client";

import { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { categories } from "../categories/Categories";
import CategoryInput from "../ui/CategoryInput";
import { Button } from "../ui/button";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../ui/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import { Separator } from "../ui/separator";
import ImageUpload from "../ImageUpload";

enum STEPS {
	CATEGORY = 0,
	LOACTION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

function RentModal() {
	const [step, setStep] = useState(STEPS.IMAGES);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("batroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	let bodyContent = (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					Which of this best describe your place?
				</DialogTitle>
				<DialogDescription>Pick a category</DialogDescription>
			</DialogHeader>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							item={item}
							onClick={(category) =>
								setCustomValue("category", category)
							}
							selected={category === item.label}
						/>
					</div>
				))}
			</div>
			<DialogFooter>
				<Button className="w-full" onClick={onNext}>
					Next
				</Button>
			</DialogFooter>
		</DialogContent>
	);

	if (step === STEPS.LOACTION) {
		bodyContent = (
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Where is your place located?</DialogTitle>
					<DialogDescription>Help guests find you!</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<CountrySelect
						value={location}
						onChange={(value) => setCustomValue("location", value)}
					/>
					<Map center={location?.latlng} />
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
					<DialogTitle>
						Share some basics about your place
					</DialogTitle>
					<DialogDescription>
						What amenities do you have?
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-8">
					<Counter
						title="Guests"
						subTitle="How many guests do you allow?"
						value={guestCount}
						onChange={(value) =>
							setCustomValue("guestCount", value)
						}
					/>
					<Separator className="my-2" />
					<Counter
						title="Rooms"
						subTitle="How many rooms do you allow?"
						value={roomCount}
						onChange={(value) => setCustomValue("roomCount", value)}
					/>
					<Separator className="my-2" />
					<Counter
						title="Bathrooms"
						subTitle="How many bathrooms do you allow?"
						value={bathroomCount}
						onChange={(value) =>
							setCustomValue("bathroomCount", value)
						}
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

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a photo of your place</DialogTitle>
					<DialogDescription>
						Show guests what your place looks like!
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-8">
					<ImageUpload
						onChange={(value) => setCustomValue("imageSrc", value)}
						value={imageSrc}
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

	return (
		<Dialog>
			<DialogTrigger>
				<div className="border rounded-md px-3 py-[0.5rem] text-sm hover:border-gray-400 transition hover:bg-gray-100 duration-300 hidden md:block">
					List your property
				</div>
			</DialogTrigger>
			{bodyContent}
		</Dialog>
	);
}

export default RentModal;
