import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userInfo: null,
  isAuthenticated: false,
  setUserFromAuth: (firebaseUser) => {
    if(firebaseUser) {
      set({
        userInfo: {
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
        },
        isAuthenticated: true,
      });
    } else {
      set({userInfo: null, isAuthenticated: false});
    }
  }
}));