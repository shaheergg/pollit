import { create } from "zustand";
import { client } from "@/lib/utils";
import { toast } from "sonner";
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
  login: async (email, password) => {
    try {
      const { data } = await client.post("/signin", {
        data: { email, password },
      });
      set({ token: data.token, auth: true });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error(error);
    }
  },
  register: async (name, email, password) => {
    try {
      const { data } = await client.post("/register", {
        data: { name, email, password },
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ token: data.token, auth: true });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error(error);
    }
  },
}));
