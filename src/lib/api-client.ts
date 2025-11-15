import createCustomFetch from "./fetch";
import { User } from "./enums";

let customFetch: (url: string, options: RequestInit) => Promise<Response>;

export const initializeApiClient = (
  getAccessToken: () => string | null,
  getRefreshToken: () => string | null,
  logout: () => void,
  setAccessToken: (token: string) => void
) => {
  customFetch = createCustomFetch(getAccessToken, getRefreshToken, logout, apiRefresh, setAccessToken);
};

export async function apiLogin(
  usernameOrEmail: string,
  password: string
): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const responseData = await response.json();
  const { user, accessToken, refreshToken } = responseData.data;
  return { user, accessToken, refreshToken };
}

export async function apiRefresh(refreshToken: string): Promise<{ accessToken: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }), // Send refresh token in body
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Token refresh failed");
  }

  const data = await response.json();
  return { accessToken: data.accessToken };
}

import { CreateUserInput } from "./validation-schemas";

export async function apiSignup(data: CreateUserInput): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return;
}

export async function apiForgotPassword(email: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Forgot password failed");
  }

  return;
}

export async function apiResetPassword(resetToken: string, newPassword: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: resetToken, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Reset password failed");
  }

  return;
}

export async function apiValidateResetToken(token: string): Promise<boolean> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-reset-token?token=${token}`, {
    method: "GET",
  });

  return response.ok;
}

export async function apiVerifyEmail(token: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Email verification failed");
  }

  return;
}

export async function apiResendVerificationEmail(email: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to resend verification email");
  }

  return;
}
