import { create } from "zustand";
import { toast } from "sonner";
import { BASE_URL } from "@/constants";
export const authStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  auth: localStorage.getItem("token") ? true : false,
  user: null,
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
      const response = await fetch(BASE_URL + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast("An error occurred during registration. Please try again later.");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      set({ token: data.token, auth: true });
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast("Error: " + error.message);
      console.error(error);
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        toast("An error occurred during registration. Please try again later.");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      set({ token: data.token, auth: true });
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast("Error: " + error.message);
      console.error(error);
    }
  },

  getUser: async (token) => {
    try {
      const response = await fetch(BASE_URL + "/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      set({ user: data });
    } catch (error) {
      toast("Error: " + error.message);
      console.error(error);
    }
  },
}));
