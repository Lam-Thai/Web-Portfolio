export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");
    const keywordsString = formData.get("keywords");
    const keywords = keywordsString ? JSON.parse(keywordsString) : [];

    const project = {
      title,
      description,
      image: img,
      link,
      keywords,
    };

    // Log the received project
    console.log("✅ New project received:", project);

    // TODO: Validate with Zod on server side
    // TODO: Save to database
    // TODO: revalidatePath("/projects")

    return Response.json(
      {
        ok: true,
        project,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating project:", err);
    return Response.json(
      {
        ok: false,
        error: "Invalid payload",
      },
      { status: 400 }
    );
  }
}
