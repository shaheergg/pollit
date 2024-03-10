import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { create } from "zustand";

export const usePollStore = create((set) => ({
  polls: [],
  getPolls: async (token) => {
    try {
      const response = await fetch(BASE_URL + "/api/polls", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const polls = await response.json();
      set({ polls });
    } catch (error) {
      toast(`Error: ${error.message}`, {
        type: "error",
      });
    }
  },
  createPoll: async (token, poll) => {
    try {
      const response = await fetch(BASE_URL + "/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(poll),
      });
      const newPoll = await response.json();
      set((state) => ({ polls: [...state.polls, newPoll] }));
      toast("Poll created successfully!", {
        type: "success",
      });
    } catch (error) {
      toast(`Error: ${error.message}`, {
        type: "error",
      });
    }
  },
}));
