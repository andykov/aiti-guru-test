import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, LoginResponse } from "../types/auth.types";

const STORAGE_KEY = "auth-storage";

const authStorage: Storage = {
  get length() {
    return sessionStorage.length;
  },
  key(index) {
    return sessionStorage.key(index);
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  },

  getItem(name) {
    return localStorage.getItem(name) ?? sessionStorage.getItem(name);
  },

  setItem(name, value) {
    try {
      const parsed = JSON.parse(value);
      const rememberMe = parsed?.state?.rememberMe ?? false;
      const target = rememberMe ? localStorage : sessionStorage;
      const other = rememberMe ? sessionStorage : localStorage;
      target.setItem(name, value);
      other.removeItem(name);
    } catch {
      sessionStorage.setItem(name, value);
    }
  },

  removeItem(name) {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      rememberMe: false,

      setRememberMe: (value: boolean) => set({ rememberMe: value }),

      login: (data: LoginResponse) => {
        const { accessToken, refreshToken, ...user } = data;
        set({ accessToken, refreshToken, user });
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          rememberMe: false,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => authStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
