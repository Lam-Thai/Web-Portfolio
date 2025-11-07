import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSlug } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });
  const { projects } = await res.json();

  const project = projects.find((p) => createSlug(p.title) === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/projects">← Back to Projects</Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {project.keywords?.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full" size="lg">
            <a href={project.link} target="_blank" rel="noreferrer">
              View Project →
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
