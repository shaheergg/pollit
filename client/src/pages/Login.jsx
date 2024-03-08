import { Button } from "@/components/ui/button";
import React from "react";
import { authStore } from "@/store/auth";
const Login = () => {
  const setToken = authStore((state) => state.setToken);
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-4xl font-semibold">Login in the app</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere iste
        ullam consequatur.
      </p>
      <Button width={"100%"} onClick={() => setToken("random")}>
        Login
      </Button>
    </div>
  );
};

export default Login;
