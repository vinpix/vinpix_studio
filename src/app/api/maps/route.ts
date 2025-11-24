import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  process.env.NEXT_PUBLIC_MAP_LAMBDA_URL ||
  "https://abk5mbuematk6lfqtfc4vmru4i0ldxqp.lambda-url.ap-southeast-1.on.aws/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[API Route] Received request:", JSON.stringify(body, null, 2));

    // Forward request to Lambda URL
    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[API Route] Lambda response status:", response.status);

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("[API Route] Lambda returned non-JSON:", text);
      return NextResponse.json(
        { error: "Lambda returned non-JSON response", text },
        { status: 500 }
      );
    }

    console.log(
      "[API Route] Lambda response data:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Lambda function error", details: data },
        { status: response.status }
      );
    }

    // Return response with CORS headers (handled automatically by Next.js)
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[API Route] Error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight (if needed)
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
