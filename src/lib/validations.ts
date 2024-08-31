import { z } from "zod";

export const signUpSchema = z.object({
	username: z
		.string()
		.trim()
		.min(3, "Username must be at least 3 characters")
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, - and _ are allowed"
		),
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.email("Invalid email address"),
	password: z
		.string()
		.trim()
		.min(6, "Password must be at least 6 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.email("Invalid email address"),
	password: z.string().trim().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
