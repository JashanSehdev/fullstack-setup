"use client";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFields, RegisterInput, registerSchema } from "./register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAppDispatch } from "@/features/store";
import { registerUserAsync } from "@/features/auth/handle-auth/auth.action";
import styles from "./register.module.css";
import GoogleAuthButton from "@/components/auth/google-auth-button/google-auth";
import Link from "next/link";

const inputs: InputFields[] = [
  {
    name: "username",
    type: "text",
    placeholder: "eg: John Doe",
    label: "Enter Your Username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "eg: john.doe@gmail.com",
    label: "Enter Your Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Enter Your Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Your Password",
    label: "Confirm Your Password",
  },
];

export default function Register() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (
    data: RegisterInput,
  ) => {
    try {
      setLoading(true);
      const { confirmPassword, ...rest } = data;
      await dispatch(registerUserAsync(rest));
    } catch (Error) {
      console.error(Error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper className={styles.Container}>
      <Stack direction="column" spacing={3}>
        <Typography variant="h3">Create Your Account</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
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
              <Link href={"login"}>
                <Typography>Login</Typography>
              </Link>
            </Stack>
            <Button loading={loading} type="submit" variant="contained">
              Signup
            </Button>
          </Stack>
        </form>
        <GoogleAuthButton />
      </Stack>
    </Paper>
  );
}
