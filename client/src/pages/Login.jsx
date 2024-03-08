import { Button } from "@/components/ui/button";
import React from "react";
import { authStore } from "@/store/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const Login = () => {
  const setToken = authStore((state) => state.setToken);
  return (
    <div className="flex items-center justify-center max-w-5xl min-h-screen mx-auto space-y-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full" onClick={() => setToken("token")}>
            Login
          </Button>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?{" "}
            <Button variant="link">
              <Link to={"/register"}>Sign Up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
