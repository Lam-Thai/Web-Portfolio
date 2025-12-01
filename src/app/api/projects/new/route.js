import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@auth0/nextjs-auth0";
import { insertProject } from "@/lib/db";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  img: z.string().url(),
  link: z.string().url(),
  keywords: z.array(z.string()).default([]),
});

export async function POST(req) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");
    const keywordsString = formData.get("keywords");
    const keywords = keywordsString ? JSON.parse(keywordsString) : [];

    // Validate
    const validationResult = projectSchema.safeParse({
      title,
      description,
      img,
      link,
      keywords,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid form data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Insert into database
    const project = await insertProject({
      title: validationResult.data.title,
      description: validationResult.data.description,
      image: validationResult.data.img,
      link: validationResult.data.link,
      keywords: validationResult.data.keywords,
    });

    console.log("✅ Project created in database:", project);

    return NextResponse.json(
      {
        ok: true,
        project,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating project:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
        message: err.message,
      },
      { status: 500 }
    );
  }
}
