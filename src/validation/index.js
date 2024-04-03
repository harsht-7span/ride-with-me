import { data } from "autoprefixer";
import * as z from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Enter valid mobile number" })
    .refine((data) => data.length >= 10, {
      message: "Enter valid mobile number",
    }),
});

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Name should be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Enter valid mobile number" })
    .max(10, { message: "number should not greater than 10" })
    .regex(/^\d+$/, {
      message: "Mobile number must contain only numeric digits",
    })
    .refine((data) => data.length >= 10, {
      message: "Enter 10 digit number",
    }),
  email: z.string().email({ message: "Enter a valid email address" }),
  role: z.any(),
});

export const otpSchema = z.object({
  phoneNumber: z.any(),
  otp: z
    .string()
    .min(1, { message: "Otp required!!" })
    .max(4, { message: "Otp must be 4 digit!!" })
    .refine((data) => data.length >= 4, {
      message: "Enter otp",
    }),
});
