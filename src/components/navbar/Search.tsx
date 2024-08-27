import { SearchIcon } from "lucide-react";

function Search() {
	return (
		<div className="border w-full md:w-auto py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer relative translate-x-[25%]">
			<div className="flex items-center justify-between text-sm">
				<div className="font-semibold px-6">Anywhere</div>
				<div className="hidden sm:block font-semibold px-6 border-x flex-1  text-center">
					Any Week
				</div>
				<div className="pl-6 pr-2 text-gray-600 flex items-center gap-3">
					<div className="hidden sm:block">Add Guests</div>
					<div className="p-2 bg-primary rounded-full text-white">
						<SearchIcon size={18} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
