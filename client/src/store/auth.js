import { create } from "zustand";
import { client } from "@/lib/utils";
export const authStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  auth: localStorage.getItem("token") ? true : false,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, auth: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, auth: false });
  },
}));
