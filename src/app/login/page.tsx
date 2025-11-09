"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {FormEvent, useEffect, useState} from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(username, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <span className="text-xl font-bold text-primary-foreground">
              Rx
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Pharmacy System
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your pharmacy with ease
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border shadow-lg mt-4 mb-4">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="you@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-input border-border focus:ring-primary"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border focus:ring-primary"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border-destructive/30"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Forgot Password Link */}
              <div className="text-sm text-right">
                <a
                  href="#"
                  className="text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password recovery is not implemented yet.");
                  }}
                >
                  Forgot your password?
                </a>
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Registration Link */}
            <div className="mt-6 text-center text-sm mb-4">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-primary">
                  Sign Up
                </a>
              </p>
            </div>


            {/* Demo Credentials */}
            {/* <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm font-semibold text-foreground mb-2">
                Demo Credentials:
              </p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Admin:</span>{" "}
                  admin@pharmacy.com
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    Pharmacist:
                  </span>{" "}
                  pharmacist@pharmacy.com
                </p>
                <p>
                  <span className="font-medium text-foreground">Manager:</span>{" "}
                  manager@pharmacy.com
                </p>
                <p className="pt-1">Password: (any value)</p>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Pharmacy Management System &copy; 2025
        </p>
      </div>
    </div>
  );
}
