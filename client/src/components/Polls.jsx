import { authStore } from "@/store/auth";
import { usePollStore } from "@/store/poll";
import React, { useEffect } from "react";
import Poll from "./Poll";

function Polls() {
  const getPolls = usePollStore((state) => state.getPolls);
  const token = authStore((state) => state.token);
  const polls = usePollStore((state) => state.polls);
  useEffect(() => {
    getPolls(token);
  }, [getPolls, token]);
  console.log(polls);
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {polls.map((poll) => {
        return <Poll poll={poll} />;
      })}
    </div>
  );
}

export default Polls;
