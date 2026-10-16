"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField } from "@mui/material";
import { InputFields, LoginInput, loginSchema } from "./login.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';   
import { handleEmailLogin } from "@/actions/action";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try{
      setLoading(true);
      await handleEmailLogin(data.email, data.password)
    } catch (Error) {
      console.error(Error)
    } finally {
      setLoading(false)
    }
    
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column">
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

          <Button loading={loading} type="submit" variant="contained">Login</Button>
        </Stack>
      </form>
      <Button fullWidth>Google Button</Button>
    </Box>
  );
}
