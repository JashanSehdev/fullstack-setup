import z from "zod";
import {
  UseFormRegister,
  FieldPath,
  FieldErrors,
} from "react-hook-form";

export const loginSchema = z.object({
  identifier: z.string().min(1, "username or Email required"),
  password: z.string().min(6, 'Password must be least of 6 characters').max(12, 'Password must be atmost 12 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type InputFields = {
//   register: UseFormRegister<LoginInput>;
  name: FieldPath<LoginInput>;
  label: string;
  type : 'text' | 'number' | 'password' | 'email',
//   error: FieldErrors<LoginInput>;
  placeholder: string;
};
