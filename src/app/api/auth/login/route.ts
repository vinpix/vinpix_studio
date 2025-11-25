import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Trim inputs
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    console.log("[Login API] Received request:", {
      email: trimmedEmail,
      hasPassword: !!trimmedPassword,
    });

    if (!trimmedEmail || !trimmedPassword) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const lambdaPayload = {
      function: "loginVinpixAdmin",
      params: {
        email: trimmedEmail,
        password: trimmedPassword,
      },
    };

    console.log(
      "[Login API] Calling lambda with payload:",
      JSON.stringify(lambdaPayload, null, 2)
    );

    // Call lambda function for login
    let response;
    let data;
    try {
      response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lambdaPayload),
      });

      const responseText = await response.text();
      console.log("[Login API] Lambda raw response:", responseText);

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("[Login API] Failed to parse JSON response:", e);
        return NextResponse.json(
          { error: "Invalid response from lambda", rawResponse: responseText },
          { status: 500 }
        );
      }

      console.log(
        "[Login API] Lambda parsed response:",
        JSON.stringify(data, null, 2)
      );
      console.log(
        "[Login API] Response status:",
        response.status,
        "Response ok:",
        response.ok
      );
    } catch (fetchError) {
      console.error("[Login API] Fetch error:", fetchError);
      return NextResponse.json(
        {
          error: "Failed to connect to lambda",
          message:
            fetchError instanceof Error ? fetchError.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    // Check if Lambda returned an error
    // Lambda Function URL might return 200 even for errors, so check statusCode
    if (data.statusCode && data.statusCode !== 200) {
      const errorMessage =
        typeof data.body === "string"
          ? data.body
          : data.body?.error || "Login failed";
      console.error("[Login API] Login failed:", {
        statusCode: data.statusCode,
        responseStatus: response.status,
        body: data.body,
        fullData: data,
      });
      return NextResponse.json(
        {
          error: errorMessage,
          details: data.body,
        },
        { status: data.statusCode || 401 }
      );
    }

    // Also check if HTTP response is not ok
    if (!response.ok) {
      const errorMessage =
        typeof data.body === "string"
          ? data.body
          : data.body?.error || data.error || "Login failed";
      console.error("[Login API] HTTP error:", {
        responseStatus: response.status,
        body: data.body,
        fullData: data,
      });
      return NextResponse.json(
        {
          error: errorMessage,
          details: data,
        },
        { status: response.status || 401 }
      );
    }

    // Check if response body has the expected structure
    // Lambda Function URL might return different format
    let sessionToken, adminUser, lambdaUrl;

    try {
      if (data.body && typeof data.body === "object") {
        // Standard format: { statusCode: 200, body: { ... } }
        sessionToken = data.body.sessionToken;
        adminUser = data.body.adminUser;
        lambdaUrl = data.body.lambdaUrl;
      } else if (data.sessionToken) {
        // Direct format: { sessionToken: ..., adminUser: ..., ... }
        sessionToken = data.sessionToken;
        adminUser = data.adminUser;
        lambdaUrl = data.lambdaUrl;
      } else {
        console.error("[Login API] Invalid response structure:", {
          hasBody: !!data.body,
          bodyType: typeof data.body,
          dataKeys: Object.keys(data),
          fullData: data,
        });
        return NextResponse.json(
          {
            error: "Invalid response from server",
            details: "Response structure is not as expected",
            receivedData: data,
          },
          { status: 500 }
        );
      }

      if (!sessionToken) {
        console.error("[Login API] Missing sessionToken:", data);
        return NextResponse.json(
          {
            error: "Missing session token in response",
            details: data,
          },
          { status: 500 }
        );
      }

      // Set session cookie
      const cookieStore = await cookies();

      console.log("[Login API] Setting session cookie:", {
        hasToken: !!sessionToken,
        tokenLength: sessionToken?.length,
      });

      cookieStore.set("vinpix_admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      console.log("[Login API] Cookie set successfully");

      // Return user data and lambda URL
      return NextResponse.json({
        success: true,
        adminUser: adminUser,
        lambdaUrl: lambdaUrl || LAMBDA_URL,
      });
    } catch (cookieError) {
      console.error("[Login API] Error setting cookie:", cookieError);
      return NextResponse.json(
        {
          error: "Failed to set session cookie",
          message:
            cookieError instanceof Error
              ? cookieError.message
              : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Login API] Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}
