'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const login = async( email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })
    return 'Success';
  } catch (error) {
      console.error(error);
      if (error instanceof AuthError) {

      // ToDo: Handle different error types. Erros has a problem with the type
      // Solution 1: https://stackoverflow.com/questions/78627862/next-auth-signin-return-errorconfiguration-in-responce-for-invalid-credenti/78673275#78673275
      // Solution 2: https://github.com/nextauthjs/next-auth/pull/9871
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales Invalidas';
        default:
          return 'Algo salió mal.';
      }
    }
  }
}