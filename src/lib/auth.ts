/**
 * Authentication utilities for Vinpix Admin
 */

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  status: string;
}

export interface LoginResponse {
  success: boolean;
  adminUser: AdminUser;
  lambdaUrl: string;
}

/**
 * Login with email and password
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
}

/**
 * Logout current session
 */
export async function logoutAdmin(): Promise<void> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

/**
 * Verify current session
 */
export async function verifySession(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error("Error verifying session:", error);
    return false;
  }
}

/**
 * Call lambda function through Next.js API route (to avoid CORS)
 */
export async function callLambdaFunction(
  functionName: string,
  params: Record<string, unknown> = {}
): Promise<unknown> {
  // Call through Next.js API route instead of directly to Lambda
  // This avoids CORS issues
  const response = await fetch("/api/lambda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function: functionName,
      params,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.body?.error || "Lambda function call failed"
    );
  }

  const data = await response.json();

  // Handle different response formats
  if (data.body) {
    return data.body;
  }
  return data;
}

/**
 * Hello World test function
 */
export async function helloWorld(name?: string): Promise<unknown> {
  return callLambdaFunction("helloWorld", { name: name || "World" });
}
