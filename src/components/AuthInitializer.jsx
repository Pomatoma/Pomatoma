import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firbaseConfig';

export default function AuthInitializer() {
  const setUserFromAuth = useAuthStore((s) => s.setUserFromAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserFromAuth(user);
    });
    return () => unsubscribe();
  }, [setUserFromAuth]);

  return null;
}
