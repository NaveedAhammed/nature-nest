"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

function ImageUpload({ onChange, value }: ImageUploadProps) {
	const handleUpload = useCallback(
		(result: any) => {
			console.log(result);
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			uploadPreset="blfum0wo"
			options={{ maxFiles: 1 }}
			onSuccess={handleUpload}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open()}
						className="relative cursor-pointer hover:opacity-70 rounded-lg transition border-dashed border-2 p-40 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400"
					>
						<TbPhotoPlus size={40} />
						<div className="font-semibold text-lg">
							Click to upload
						</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									alt="Upload"
									fill
									style={{ objectFit: "cover" }}
									src={value}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
}

export default ImageUpload;
