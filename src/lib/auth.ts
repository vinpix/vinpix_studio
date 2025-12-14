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

  // Attempt to parse JSON regardless of status to inspect structured errors
  let data: any;
  try {
    data = await response.json();
  } catch (e) {
    if (!response.ok) {
      throw new Error("Lambda function call failed");
    }
    // Non-JSON but OK response (unexpected)
    return {};
  }

  // Special handling: allow public contract 401 (password required) to flow as data
  // so the client can prompt for password instead of treating as a hard error.
  if (!response.ok) {
    // If lambda returned a structured body with requirePassword flag, return it
    if (data?.body?.requirePassword === true) {
      return data.body;
    }

    // Extract the most detailed error message available
    let errorMessage = "Lambda function call failed";

    // Check multiple error locations in order of priority
    if (data?.body?.error) {
      errorMessage = data.body.error;
    } else if (data?.error) {
      errorMessage = data.error;
    } else if (data?.details?.error) {
      errorMessage = data.details.error;
    } else if (data?.details?.details) {
      // Gemini API errors are nested deeper
      errorMessage =
        typeof data.details.details === "string"
          ? data.details.details
          : JSON.stringify(data.details.details);
    } else if (data?.message) {
      errorMessage = data.message;
    }

    // Log full error details for debugging
    console.error("[callLambdaFunction] Lambda error:", {
      functionName,
      status: response.status,
      errorMessage,
      fullData: data,
    });

    throw new Error(errorMessage);
  }

  // For OK responses, unwrap body if present (Lambda Function URL common format)
  if (data && typeof data === "object" && "body" in data) {
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
