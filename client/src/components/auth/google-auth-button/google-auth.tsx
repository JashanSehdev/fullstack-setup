import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import GoogleLogo from '@/../public/google.png'
import styles from './google.module.css'
import { googleAuthAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch } from "@/features/store";
import { handleGoogleLogin as GoogleSignIn } from "@/lib/firebase/auth";

export default function GoogleAuthButton() {
    const dispatch = useAppDispatch()
    const HandleGoogleLogin = async () => {
        try {
          const result = await GoogleSignIn();
          if (!result) return;
          await dispatch(googleAuthAsync(result)).unwrap();
        } catch (error) {
          console.error(error)
    
        }
      };
  return (
    <Button variant={'outlined'} onClick={HandleGoogleLogin}>
      <Stack spacing={2} direction={'row'} className={styles.ButtonContent}>
        <Image
          src={GoogleLogo}      
          alt="Google Logo" 
          className={styles.Image}
        />
        <Typography>Google</Typography>
        
      </Stack>
    </Button>
  );
}
