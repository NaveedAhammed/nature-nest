"use client";

import { categories } from "@/components/categories/Categories";
import Counter from "@/components/Counter";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import CategoryInput from "@/components/ui/CategoryInput";
import CountrySelect from "@/components/ui/CountrySelect";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
	CATEGORY = 0,
	LOACTION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

function Listing() {
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
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
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");
	const title = watch("title");
	const description = watch("description");
	const price = watch("price");

	const Map = useMemo(
		() => dynamic(() => import("../../components/Map"), { ssr: false }),
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

	const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
		if (step !== STEPS.PRICE) return onNext();

		setIsLoading(true);
		axios
			.post("/api/listings", data)
			.then(() => {
				toast({
					title: "Listing created successfully!",
				});
				reset();
				setStep(STEPS.CATEGORY);
				router.push("/");
			})
			.catch((err) => {
				console.error(err);
				toast({
					title: "Something went wrong.",
				});
			});
	};

	let bodyContent = (
		<div className="flex flex-col">
			<div className="flex flex-col">
				<h1 className="text-lg font-bold">
					Which of this best describe your place?
				</h1>
				<p className="text-sm font-medium">Pick a category</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto py-8">
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
			<div className="flex items-center">
				<Button className="w-full" onClick={onNext}>
					Next
				</Button>
			</div>
		</div>
	);

	if (step === STEPS.LOACTION) {
		bodyContent = (
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h1 className="text-lg font-bold">
						Where is your place located?
					</h1>
					<p className="text-sm font-medium">Help guests find you!</p>
				</div>
				<div className="flex flex-col gap-4 py-8">
					<CountrySelect
						value={location}
						onChange={(value) => setCustomValue("location", value)}
					/>
					<Map center={location?.latlng} />
				</div>
				<div className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Back
					</Button>
					<Button className="w-full" onClick={onNext}>
						Next
					</Button>
				</div>
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h1 className="text-lg font-bold">
						Share some basics about your place
					</h1>
					<p className="text-sm font-medium">
						What amenities do you have?
					</p>
				</div>
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
				<div className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Back
					</Button>
					<Button className="w-full" onClick={onNext}>
						Next
					</Button>
				</div>
			</div>
		);
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">
						Add a photo of your place
					</h1>
					<p className="text-sm font-medium text-neutral-600">
						Show guests what your place looks like!
					</p>
				</div>
				<div className="flex flex-col gap-4 py-8">
					<ImageUpload
						onChange={(value) => setCustomValue("imageSrc", value)}
						value={imageSrc}
					/>
				</div>
				<div className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Back
					</Button>
					<Button className="w-full" onClick={onNext}>
						Next
					</Button>
				</div>
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">
						How would you describe your place?
					</h1>
					<p className="text-sm font-medium text-neutral-600">
						Short and sweet works best!
					</p>
				</div>
				<div className="flex flex-col gap-4 py-8">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium">Title</span>
						<Input
							id="title"
							{...register("title", { required: true })}
							placeholder="Type your title here."
							value={title}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium">Description</span>
						<Textarea
							placeholder="Type your description here."
							rows={15}
							id="description"
							{...register("description", { required: true })}
							value={description}
						/>
					</div>
				</div>
				<div className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Back
					</Button>
					<Button className="w-full" onClick={onNext}>
						Next
					</Button>
				</div>
			</div>
		);
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">Now, set your price</h1>
					<p className="text-sm font-medium text-neutral-600">
						How much do you charge per night?
					</p>
				</div>
				<div className="flex flex-col gap-4 py-8">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium">Title</span>
						<Input
							id="price"
							{...register("price", { required: true })}
							placeholder="Enter your price."
							type="number"
							value={price}
						/>
					</div>
				</div>
				<div className="flex items-center gap-8">
					<Button
						className="w-full"
						variant="outline"
						onClick={onBack}
					>
						Back
					</Button>
					<Button className="w-full" onClick={handleSubmit(onSubmit)}>
						Create
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="w-[50vw] mx-auto px-4 xl:px-0 py-8">{bodyContent}</div>
	);
}

export default Listing;
