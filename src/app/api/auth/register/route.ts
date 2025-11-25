import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, displayName } = body;

    // Validate and trim inputs
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    const trimmedDisplayName = displayName?.trim();

    console.log("[Register API] Received request:", {
      email: trimmedEmail,
      displayName: trimmedDisplayName,
      hasPassword: !!trimmedPassword,
      originalBody: body,
    });

    if (!trimmedEmail || !trimmedPassword || !trimmedDisplayName) {
      return NextResponse.json(
        {
          error:
            "Email, password, and displayName are required and cannot be empty",
        },
        { status: 400 }
      );
    }

    const lambdaPayload = {
      function: "createVinpixAdminUser",
      params: {
        email: trimmedEmail,
        password: trimmedPassword,
        displayName: trimmedDisplayName,
      },
    };

    console.log(
      "[Register API] Calling lambda with payload:",
      JSON.stringify(lambdaPayload, null, 2)
    );
    console.log("[Register API] Lambda URL:", LAMBDA_URL);

    // Call lambda function for registration
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

      console.log("[Register API] Lambda response status:", response.status);
      console.log(
        "[Register API] Lambda response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const responseText = await response.text();
      console.log("[Register API] Lambda raw response:", responseText);

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("[Register API] Failed to parse JSON response:", e);
        return NextResponse.json(
          { error: "Invalid response from lambda", rawResponse: responseText },
          { status: 500 }
        );
      }

      console.log(
        "[Register API] Lambda parsed response data:",
        JSON.stringify(data, null, 2)
      );
    } catch (fetchError) {
      console.error("[Register API] Fetch error:", fetchError);
      return NextResponse.json(
        {
          error: "Failed to connect to lambda",
          message:
            fetchError instanceof Error ? fetchError.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    if (!response.ok || data.statusCode !== 200) {
      // Handle different error formats
      let errorMessage = "Registration failed";

      if (typeof data.body === "string") {
        errorMessage = data.body;
      } else if (data.body?.error) {
        errorMessage = data.body.error;
      } else if (data.body) {
        errorMessage = JSON.stringify(data.body);
      } else if (data.error) {
        errorMessage = data.error;
      }

      console.error("[Register API] Registration failed:", {
        statusCode: data.statusCode,
        responseStatus: response.status,
        body: data.body,
        fullData: data,
      });

      return NextResponse.json(
        {
          error: errorMessage,
          details: data.body,
          statusCode: data.statusCode || response.status,
        },
        { status: data.statusCode || response.status || 400 }
      );
    }

    // Return success message
    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      adminUser: data.body.adminUser,
    });
  } catch (error) {
    console.error("[Register API] Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}
