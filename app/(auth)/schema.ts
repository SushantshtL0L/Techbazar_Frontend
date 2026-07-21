import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["user", "seller"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterData = z.infer<typeof registerSchema>;

export const adminCreateUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  role: z.enum(["user", "admin"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminCreateUserData = z.infer<typeof adminCreateUserSchema>;

export const forgetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Minimum 6 characters"),
  confirmNewPassword: z.string().min(6, "Minimum 6 characters"),
}).refine((v) => v.newPassword === v.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Passwords do not match",
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmNewPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((v) => v.newPassword === v.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Passwords do not match",
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
