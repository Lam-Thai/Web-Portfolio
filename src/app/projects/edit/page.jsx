import { getSession } from "@auth0/nextjs-auth0";
import { redirect, notFound } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getProjectById } from "@/lib/db";
import EditProjectForm from "@/components/edit-project-form";

export default async function EditProjectPage({ params }) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/login");
  }

  const { slug } = await params;
  const project = await getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-muted-foreground">
            Update the details of your project
          </p>
        </CardHeader>
        <CardContent>
          <EditProjectForm project={project} uuid={slug} />
        </CardContent>
      </Card>
    </div>
  );
}
