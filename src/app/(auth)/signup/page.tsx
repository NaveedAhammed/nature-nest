"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

function SignUp() {
	const form = useForm();

	return (
		<main className="h-[calc(100vh-4rem)] w-full max-w-[1280px] flex items-center mx-auto">
			<div className="h-full w-full flex items-center justify-between gap-40">
				<div className="flex flex-col gap-2 w-[50%]">
					<h1 className="text-6xl font-bold text-primary">
						Elevate Your Professional Presence
					</h1>
					<p className="text-xl font-normal text-gray-600">
						Create stunning portfolios, resumes, and GitHub READMEs
						with ProfileFolio. Join now and showcase your skills
						with our intuitive and powerful platform.
					</p>
				</div>
				<Card className="w-[32%] bg-white shadow-lg">
					<CardHeader>
						<CardTitle className="font-bold">Sign Up</CardTitle>
						<CardDescription>Create an account</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<FormField
								control={form.control}
								name="username"
								render={() => (
									<FormItem>
										<FormLabel />
										<FormControl>
											<FormField
												control={form.control}
												name="username"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Username
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Mark Doe"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={() => (
									<FormItem>
										<FormLabel />
										<FormControl>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Email
														</FormLabel>
														<FormControl>
															<Input
																placeholder="mark@example.com"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={() => (
									<FormItem>
										<FormLabel />
										<FormControl>
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Password
														</FormLabel>
														<FormControl>
															<Input
																placeholder="password"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full mt-4" type="submit">
								Continue
							</Button>
						</Form>
						<Separator className="my-4" />
						<Button
							variant="outline"
							className="w-full mt-4 flex items-center gap-4"
							type="submit"
						>
							<FcGoogle size={18} />
							Continue with Google
						</Button>
						<div className="flex items-center gap-2 justify-center mt-4">
							<span className="text-gray-600">
								Already have an account?
							</span>
							<Link
								href="/login"
								className="underline font-semibold"
							>
								Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

export default SignUp;
