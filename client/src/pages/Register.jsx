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
import { toast } from "sonner";
import { validateEmail } from "@/lib/utils";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = authStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const submitForm = async () => {
    if (!validateEmail(email)) {
      toast("Please enter a valid email address.", { type: "error" });
      return;
    }
    if (!name || !password) {
      toast("Please fill out all fields.", {
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast("Registration successful!", {
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (error) => error.msg
        );
        toast.error(errorMessages.join(", "));
      } else {
        console.error("Registration error:", error);
        toast.error(
          "An error occurred during registration. Please try again later."
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
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your information to Register to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={submitForm} disabled={loading} className="w-full">
            {loading ? "Loading..." : "Register"}
          </Button>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?
            <Button variant="link">
              <Link to={"/login"}>Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
