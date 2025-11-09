import createCustomFetch from "./fetch";
import { User } from "./enums";

let customFetch: (url: string, options: RequestInit) => Promise<Response>;

export const initializeApiClient = (
  getAccessToken: () => string | null,
  getRefreshToken: () => string | null,
  logout: () => void
) => {
  customFetch = createCustomFetch(getAccessToken, getRefreshToken, logout, apiRefresh);
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

  const data = await response.json();
  return { user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };
}

export async function apiRefresh(refreshToken: string): Promise<{ accessToken: string }> {
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
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

export async function apiSignup(email: string, password: string): Promise<void> {
  // Placeholder function
  console.log("apiSignup called with:", email, password);
  return Promise.resolve();
}

export async function apiForgotPassword(email: string): Promise<void> {
  // Placeholder function
  console.log("apiForgotPassword called with:", email);
  return Promise.resolve();
}

export async function apiResetPassword(email: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Reset password failed");
  }

  return;
}
