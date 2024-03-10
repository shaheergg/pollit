import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { create } from "zustand";

export const useVoteStore = create((set) => ({
  //   votes: 0,
  castVote: async (optionId, token) => {
    try {
      const res = await fetch(BASE_URL + "/api/cast-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ optionId }),
      });
      const data = await res.json();
      toast("Vote cast successfully", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast("Error: " + error.message, {
        type: "error",
      });
    }
  },
}));
