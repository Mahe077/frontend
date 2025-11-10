"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FormHeader} from "@/components/common/app-form/form-header";
import {FormFooter} from "@/components/common/app-form/form-footer";
import {motion} from "motion/react";
import {AppCard} from "@/components/common/app-form/app-card";
import {AppFormBody} from "@/components/common/app-form/app-form-body";
import {AppButton} from "@/components/common/app-button";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {login, isAuthenticated} = useAuth()
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
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="w-full max-w-md"
                >
                    <FormHeader
                        title={"Pharmacy System"}
                        subtitle={"Manage your pharmacy with ease"}
                    />

                    {/* Login Card */}
                    <AppCard
                        bodyTitle={"Sign In"}
                        bodySubtitle={"Enter your credentials to access the system"}
                        footerText={"Don't have an account?"}
                        footerLinkText={"Sign Up"}
                        footerHref="/signup"
                    >
                        <AppFormBody handleSubmit={handleSubmit} error={error}>
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

                            {/* Forgot Password Link */}
                            <div className="text-sm text-right">
                                <Link href="/forgot-password" className="text-primary hover:text-primary/80">
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <AppButton
                                isLoading={isLoading}
                                loadingText={"Sign in..."}
                            >
                                Sign In
                            </AppButton>
                        </AppFormBody>
                    </AppCard>

                    <FormFooter/>
                </motion.div>
            </div>
        </div>
    );
}
