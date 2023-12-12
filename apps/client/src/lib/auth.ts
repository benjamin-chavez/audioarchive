// apps/client/src/lib/auth.ts
// TODO: Verify that server code won't leak onto the client

import { getSession as getAuth0Session } from '@auth0/nextjs-auth0';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';

export interface AuthInterface {
  // getAppUserSession(params): Promise<any>;
  // useAppUser(): { user; error; isLoading };

  getSession(): Promise<any>;
  useAppUser(): { user; error; isLoading; isAuthenticated };
}

export const auth0Adapter: AuthInterface = {
  getSession() {
    'use server';
    return getAuth0Session();
  },
  useAppUser() {
    const { user, error, isLoading } = useAuth0User();
    // return useAuth0User();
    return {
      user: user ?? null,
      error: error ?? null,
      isLoading: isLoading ?? false,
      isAuthenticated: user && !error && !isLoading,
    };
  },
};

export const authAdapter = auth0Adapter;
