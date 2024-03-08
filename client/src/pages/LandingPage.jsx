import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between px-12 py-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold">Pollit.</h2>
        </div>
        <div>
          <Button>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[90vh] gap-4 mx-auto">
        <h2 className="text-4xl font-semibold">Create polls and get results</h2>
        <p>Create interactive polls and get results in real-time.</p>
        <div className="flex items-center gap-4">
          <Button>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline">
            <Link to="/register">Sign Up</Link>
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
