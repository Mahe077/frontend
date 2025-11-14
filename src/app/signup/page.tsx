"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {AlertCircle, Eye, EyeOff} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {apiSignup} from "@/lib/api-client";
import {usePasswordValidationRules} from "@/hooks/usePasswordValidationRules";
import {PasswordStrengthIndicator} from "@/components/common/password-strength-indicator";
import {AppButton} from "@/components/common/app-button";
import {motion} from "motion/react";
import {FormHeader} from "@/components/common/app-form/form-header";
import {AppCard} from "@/components/common/app-form/app-card";
import {FormFooter} from "@/components/common/app-form/form-footer";
import {AppFormBody} from "@/components/common/app-form/app-form-body";

export default function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter()
    const passwordValidationRules = usePasswordValidationRules();
    const areAllRulesValid = passwordValidationRules.every((rule) => rule.regex.test(password));


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (!areAllRulesValid) {
            setError("Please ensure your password meets all the requirements.");
            setIsLoading(false);
            return;
        }

        try {
            await apiSignup(email, password)
            router.push("/login")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
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
                        title={"Create an Account"}
                        subtitle={"Join the Pharmacy System today"}
                    />

                    <AppCard
                        bodyTitle={"Sign Up"}
                        bodySubtitle={"Enter your details to create an account"}
                        footerText={"Already have an account?"}
                        footerLinkText={"Sign In"}
                        footerHref="/login"
                    >
                        <AppFormBody handleSubmit={handleSubmit} error={error}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-input border-border focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-foreground font-medium"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-input border-border focus:ring-primary pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-foreground font-medium"
                                >
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="bg-input border-border focus:ring-primary pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="bg-destructive/10 border-destructive/30"
                                >
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <AppButton
                                isLoading={isLoading}
                                loadingText={"Sign up..."}
                                disabled={!areAllRulesValid || isLoading}
                            >
                                Sign Up
                            </AppButton>

                            <div className="my-4">
                                <PasswordStrengthIndicator password={password} rules={passwordValidationRules}/>
                            </div>

                        </AppFormBody>
                    </AppCard>
                    <FormFooter/>
                </motion.div>
            </div>
        </div>
    )
        ;
}
