import { Button } from "@/components/ui/button";
import { authStore } from "@/store/auth";
import React from "react";

const Dashbaord = () => {
  const logout = authStore((state) => state.logout);
  return (
    <div className="max-w-5xl py-4 mx-auto">
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Dashbaord;
