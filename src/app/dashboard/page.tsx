"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
    // <div className="min-h-screen flex items-center justify-center bg-background p-4">
    //   <h1 className="text-3xl font-bold text-foreground">Welcome to the Dashboard</h1>
    //   <Button onClick={logout}>Log Out</Button>
    // </div>
      <div><Button onClick={logout}>Log Out</Button></div>
  );
}