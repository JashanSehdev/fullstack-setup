import z from "zod";
import {
  FieldPath,
} from "react-hook-form";

export const registerSchema = z.object({
  username: z.string().min(1, 'Username required').max(15, 'username should bot greater than 15 lines'),
  email: z.email(),
  password: z.string().min(6, 'Password must be least of 6 characters').max(12, 'Password must be atmost 12 characters'),
  confirmPassword: z.string().min(6, 'Password must be least of 6 characters').max(12, 'Password must be atmost 12 characters'),
})
.refine((val) => val.password === val.confirmPassword, {
    message : 'password should be same',
    path: ["confirmPassword"]
})

export type RegisterInput = z.infer<typeof registerSchema>;

export type InputFields = {
//   register: UseFormRegister<LoginInput>;
  name: FieldPath<RegisterInput>;
  label: string;
  type : 'text' | 'number' | 'password' | 'email',
//   error: FieldErrors<LoginInput>;
  placeholder: string;
};
