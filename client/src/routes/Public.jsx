import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authStore } from "@/store/auth";

export const Public = () => {
  const auth = authStore((state) => state.auth);

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};
