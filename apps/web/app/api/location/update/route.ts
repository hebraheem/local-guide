import { getServerAuthUser } from "@/lib/jwt.server";
import { userService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LocationUpdatePayload {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authUser = await getServerAuthUser();
    if (!authUser.isAuthenticated || !authUser.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body: LocationUpdatePayload = await request.json();
    const { latitude, longitude, accuracy, timestamp } = body;

    // Validate data
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return NextResponse.json(
        { error: "Invalid coordinates" },
        { status: 400 }
      );
    }

    try {
      await userService.updateLocation({
        latitude,
        longitude,
      });

      console.log(
        `📍 Location updated for user ${authUser.user.sub}:`,
        { latitude, longitude, accuracy }
      );
    } catch (error) {
      console.error("Failed to update location in database:", error);
      return NextResponse.json(
        { error: "Failed to update location in database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Location updated successfully",
        data: {
          latitude,
          longitude,
          accuracy,
          timestamp,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Location update error:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}
