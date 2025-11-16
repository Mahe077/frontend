"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
      <div><Button onClick={logout}>Log Out</Button></div>
  );
}