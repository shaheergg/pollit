import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import { validateEmail } from "@/lib/utils";
import { toast } from "sonner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = authStore((state) => state.login);

  const submitForm = async () => {
    if (!validateEmail(email)) {
      toast("Please enter a valid email address.", { type: "error" });
      return;
    }
    if (!password) {
      toast("Please fill out password field.", {
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast("Authentication successful!", {
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.msg
        );
        toast.error(errorMessages.join(", "));
      } else {
        console.error("Authentication error:", error);
        toast.error(
          "An error occurred during authentication. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };
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
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            type="password"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={submitForm} disabled={loading} className="w-full">
            {loading ? "Loading..." : "Login"}
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
