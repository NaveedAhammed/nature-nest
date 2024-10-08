"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const pathname = usePathname();
	const form = useForm<LoginSchema>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	function onSubmit(data: LoginSchema) {
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: true,
			callbackUrl: pathname,
		})
			.then((callback) => {
				console.log(callback);
				if (callback?.ok) {
					toast({
						title: "Logged in successfully",
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<main className="h-[calc(100vh-4rem)] w-full max-w-[1280px] flex items-center mx-auto">
			<div className="h-full w-full flex items-center justify-between gap-40">
				<div className="flex flex-col gap-2 w-[50%]">
					<h1 className="text-6xl font-bold text-primary">
						Welcome Back
					</h1>
					<p className="text-xl font-normal text-gray-600">
						Sign in to access your ProfileFolio account. Manage your
						portfolios, resumes, and GitHub READMEs with ease.
					</p>
				</div>
				<Card className="w-[32%] bg-white shadow-lg">
					<CardHeader>
						<CardTitle className="font-bold">Sign In</CardTitle>
						<CardDescription>Login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
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
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
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
								<Button
									className="w-full mt-4"
									type="submit"
									disabled={isLoading}
								>
									Continue
								</Button>
							</form>
						</Form>
						<Separator className="my-4" />
						<Button
							variant="outline"
							className="w-full mt-4 flex items-center gap-4"
							type="submit"
							onClick={() => signIn("google")}
							disabled={isLoading}
						>
							<FcGoogle size={18} />
							Continue with Google
						</Button>
						<div className="flex items-center gap-2 justify-center mt-4">
							<span className="text-gray-600">
								Don&apos;t have an account?
							</span>
							<Link
								href="/signup"
								className="underline font-semibold"
							>
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

export default Login;
