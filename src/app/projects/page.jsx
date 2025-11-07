import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSlug } from "@/lib/utils";

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });
  const { projects } = await res.json();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Projects</h1>
        <Button asChild>
          <Link href="/projects/new">+ New Project</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const slug = createSlug(p.title);
          return (
            <Card
              key={slug}
              className="group hover:scale-105 transition-transform flex flex-col"
            >
              <CardHeader>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardHeader>
              <CardContent className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.keywords?.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="text-xs"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                >
                  <a href={p.link} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/projects/${slug}`}>Details</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
