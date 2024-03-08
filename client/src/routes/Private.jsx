import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authStore } from "@/store/auth";

export const Private = () => {
  const auth = authStore((state) => state.auth);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
