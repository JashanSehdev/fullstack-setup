'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFields, RegisterInput, registerSchema } from "./register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { useAppDispatch } from "@/features/store";
import { registerUserAsync } from "@/features/auth/handle-auth/auth.action";

const inputs : InputFields[] = [
    {
        name : 'username',
        type : 'text',
        placeholder : 'eg: John Doe',
        label: "Enter Your Username"
    },
    {
        name : 'email',
        type : 'email',
        placeholder : 'eg: john.doe@gmail.com',
        label: "Enter Your Email"
    },
    {
        name : 'password',
        type : 'password',
        placeholder : 'Enter your password',
        label: "Enter Your Password"
    },
    {
        name : 'confirmPassword',
        type : 'password',
        placeholder : 'Confirm Your Password',
        label: "Confirm Your Password"
    }
]

export default function Register() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data: RegisterInput) => {
    try {
      setLoading(true);
      const {confirmPassword, ...rest} = data
      await dispatch(registerUserAsync(rest))
    } catch (Error) {
      console.error(Error);
    } finally {
      setLoading(false);
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

          <Button loading={loading} type="submit" variant="contained">
            Signup
          </Button>
        </Stack>
      </form>
      <Button fullWidth>Google Button</Button>
    </Box>
  );
}
