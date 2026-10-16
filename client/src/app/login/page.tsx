"use client";

import { useRouter } from "next/navigation";
import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { InputFields, LoginInput, loginSchema } from "./login.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAppDispatch } from "@/features/store";
import {
  loginUserAsync,
} from "@/features/auth/handle-auth/auth.action";
import styles from "./login.module.css";
import GoogleAuthButton from "@/components/auth/google-auth-button/google-auth";
import Link from "next/link";

const inputs: InputFields[] = [
  {
    name: "email",
    type: "email",
    label: "Enter Your email",
    placeholder: "Enter Your Email",
  },
  {
    name: "password",
    type: "password",
    label: "Enter Your password",
    placeholder: "Enter Your Password",
  },
];
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      setLoading(true);
      await dispatch(loginUserAsync(data)).unwrap();
    } catch (Error) {
      console.error(Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={styles.container}>
      <Stack direction="column" spacing={2}>
      <Typography variant="h3">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={3}>
            {inputs.map((item) => (
              <TextField
                key={item.name}
                {...register(item.name)}
                placeholder={item.placeholder}
                type={item.type}
                error={!!errors[item.name]}
                helperText={errors[item.name]?.message}
              />
            ))}
            <Stack direction={"row"} spacing={1}>
              <Typography variant="body1">Already Have an account?</Typography>
              <Link href={"register"}>
                <Typography>Register</Typography>
              </Link>
            </Stack>

            <Button loading={loading} type="submit" variant="contained">
              Login
            </Button>
            <Divider />
          </Stack>
        </form>
        <GoogleAuthButton />
      </Stack>
    </Paper>
  );
}
