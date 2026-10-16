import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { initializeApp, cert, App } from 'firebase-admin/app'; // 1. Import modular app helpers
import { getAuth } from 'firebase-admin/auth';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
   
    const firebaseConfig: admin.ServiceAccount = {
      projectId: configService.get<string>('PROJECT_ID') ?? '',
      clientEmail: configService.get<string>('CLIENT_EMAIL') ?? '',
      privateKey: (configService.get<string>('PRIVATE_KEY') ?? '').replace(/\\n/g, '\n'),
    };

   
    const extendedConfig = {
      ...firebaseConfig,
      type: configService.get<string>('TYPE') ?? '',
      privateKeyId: configService.get<string>('PRIVATE_KEY_ID') ?? '',
      clientId: configService.get<string>('CLIENT_ID') ?? '',
      authUri: configService.get<string>('AUTH_URI') ?? '',
      tokenUri: configService.get<string>('TOKEN_URI') ?? '',
      authProviderX509CertUrl: configService.get<string>('AUTH_CERT_URL') ?? '',
      clientX509CertUrl: configService.get<string>('CLIENT_CERT_URL') ?? '',
      universeDomain: configService.get<string>('UNIVERSAL_DOMAIN') ?? '',
    };

   
    return initializeApp({
      credential: cert(extendedConfig as admin.ServiceAccount),
    });
  },
};

const firebaseAuthProvider = {
  provide: 'FIREBASE_AUTH',
  inject: ['FIREBASE_APP'],
  useFactory: (app: App) => getAuth(app), 
};  

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, firebaseAuthProvider],
  exports: ['FIREBASE_AUTH'],
})
export class FirebaseModule {}
