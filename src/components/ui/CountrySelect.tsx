"use client";

import useCountries from "@/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: string[];
	region: string;
	value: string;
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

function CountrySelect({ value, onChange }: CountrySelectProps) {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as CountrySelectValue)}
				formatOptionLabel={(option: any) => (
					<div className="flex items-center gap-3">
						<div>{option.flag}</div>
						<div>
							{option.label},{" "}
							<span className="text-neutral-500 ml-1">
								{option.region}
							</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => "p-1 border",
					input: () => "text-lg",
					option: () => "text-lg",
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary25: "#e9fcf0",
						primary: "#000",
					},
				})}
			/>
		</div>
	);
}

export default CountrySelect;
