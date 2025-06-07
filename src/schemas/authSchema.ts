import {z} from "zod"

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 5 characters")
    .max(50, "Name must be less than 50 characters"),
  userEmail: z
    .string()
    .email("Invalid email format")
    .refine((email) => email.includes("@"), "Email must contain @ symbol"),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  userRegistrationNumber: z
  .string()
  .min(1, "Registration number is required")
  .length(10 , "Invalid registration number"),
  userAvtar: z
    .string()
    .url("Must be a valid URL"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  userEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine((email) => email.includes("@"), "Email must contain @ symbol"),
  userPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type SignInFormData = z.infer<typeof signInSchema>;