import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[Lambda API] Received request:", JSON.stringify(body, null, 2));

    // Forward request to Lambda URL
    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[Lambda API] Lambda response status:", response.status);

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("[Lambda API] Lambda returned non-JSON:", text);
      try {
        data = JSON.parse(text);
      } catch (e) {
        return NextResponse.json(
          { error: "Lambda returned non-JSON response", text },
          { status: 500 }
        );
      }
    }

    console.log("[Lambda API] Lambda response data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        { error: "Lambda function error", details: data },
        { status: response.status }
      );
    }

    // Return response with CORS headers
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Lambda API] Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

