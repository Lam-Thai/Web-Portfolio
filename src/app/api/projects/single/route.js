import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@auth0/nextjs-auth0";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";

const projectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().optional(),
  link: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
});

export async function GET(request, { params }) {
  try {
    const { uuid } = await params;
    const project = await getProjectById(uuid);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { uuid } = await params;
    const body = await request.json();

    // Validate
    const validationResult = projectUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updated = await updateProject(uuid, validationResult.data);

    if (!updated) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { uuid } = await params;
    const deleted = await deleteProject(uuid);

    if (!deleted) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Project deleted successfully",
      project: deleted,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
