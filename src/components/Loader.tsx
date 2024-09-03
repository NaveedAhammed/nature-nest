"use client";

import { PuffLoader } from "react-spinners";

function Loader() {
	return (
		<div className="h-[70vh] flex flex-col justify-center items-center">
			<PuffLoader size={100} color="hsl(142.1 76.2% 36.3%)" />
		</div>
	);
}

export default Loader;
