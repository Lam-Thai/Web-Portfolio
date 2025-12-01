"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: userLoading } = useUser();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading || userLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="w-full h-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Projects</h1>
        {user && (
          <Button asChild>
            <Link href="/projects/new">+ New Project</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card
            key={p.id}
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
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild size="sm" variant="secondary" className="flex-1">
                <a href={p.link} target="_blank" rel="noreferrer">
                  Open
                </a>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href={`/projects/${p.id}`}>Details</Link>
              </Button>
              {user && (
                <Button asChild size="sm" variant="outline">
                  <Link href={`/projects/${p.id}/edit`}>Edit</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
