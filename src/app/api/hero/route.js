import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@auth0/nextjs-auth0";
import { getHero, upsertHero } from "@/lib/db";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const heroSchema = z.object({
  avatar: z
    .string()
    .trim()
    .min(1)
    .refine((v) => v.startsWith("data:"), "Avatar must be a data URL"),
  fullName: z.string().trim().min(2).max(200),
  shortDescription: z.string().trim().min(2).max(120),
  longDescription: z.string().trim().min(10).max(5000),
});

export async function GET() {
  try {
    const hero = await getHero();
    return NextResponse.json({ data: hero });
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero" },
      { status: 500 }
    );
  }
}

export const PUT = withApiAuthRequired(async (request) => {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { message: "You must be logged in to edit the hero section" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const avatarFile = formData.get("avatarFile");
    const avatarFromForm = formData.get("avatar");

    let avatarDataUrl = avatarFromForm || "";

    // Convert file to data URL if provided
    if (avatarFile && typeof avatarFile.arrayBuffer === "function") {
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const mimeType = avatarFile.type || "image/png";
      avatarDataUrl = `data:${mimeType};base64,${base64}`;
    }

    const payload = {
      avatar: avatarDataUrl,
      fullName: formData.get("fullName") || "",
      shortDescription: formData.get("shortDescription") || "",
      longDescription: formData.get("longDescription") || "",
    };

    // Validate
    const validationResult = heroSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const hero = await upsertHero(validationResult.data);
    return NextResponse.json(
      { message: "Hero updated", data: hero },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hero:", error);
    return NextResponse.json(
      { error: "Failed to update hero", message: error.message },
      { status: 500 }
    );
  }
});
