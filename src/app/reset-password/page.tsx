"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {useState, Suspense, FormEvent} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiResetPassword } from "@/lib/api-client";
import {FormHeader} from "@/components/common/app-form/form-header";
import { motion } from "motion/react";
import {FormFooter} from "@/components/common/app-form/form-footer";
import {AppCard} from "@/components/common/app-form/app-card";
import {AppFormBody} from "@/components/common/app-form/app-form-body";
import {AppButton} from "@/components/common/app-button";

function ResetPasswordComponent() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        setIsSuccess(false);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token.");
            setIsLoading(false);
            return;
        }

        try {
            await apiResetPassword(token, password);
            setIsSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to reset password. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isSuccess) {
            return (
                <div className="text-center">
                    <p className="text-green-600">
                        Your password has been reset successfully.
                    </p>
                    <Link
                        href="/login"
                        className="text-primary hover:text-primary/80 mt-4 block"
                    >
                        Back to Sign In
                    </Link>
                </div>
            );
        }

        return (
            <AppFormBody handleSubmit={handleSubmit} error={error}>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                        New Password
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

                <div className="space-y-2">
                    <Label
                        htmlFor="confirmPassword"
                        className="text-foreground font-medium"
                    >
                        Confirm New Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-input border-border focus:ring-primary"
                    />
                </div>

                <AppButton
                    isLoading={isLoading}
                    loadingText={"Resetting..."}
                >
                    Reset Password
                </AppButton>
            </AppFormBody>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="w-full max-w-md"
                >
                    <FormHeader
                        title={"Reset Your Password"}
                        subtitle={"Enter your new password below"}
                    />

                    <AppCard
                        bodyTitle={"New Password"}
                        bodySubtitle={"Choose a strong password"}
                    >
                        {renderContent()}
                    </AppCard>

                    <FormFooter/>
                </motion.div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordComponent />
        </Suspense>
    );
}
