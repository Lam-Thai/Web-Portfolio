"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  const params = useParams();
  const slug = params?.slug || "unknown";

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <h1 className="text-6xl font-bold text-muted-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold">Project Not Found</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">
            The project &ldquo;<span className="font-semibold">{slug}</span>&rdquo; doesnt
            exist in our portfolio.
          </p>
          <p className="text-sm text-muted-foreground">
            It may have been removed or the URL might be incorrect.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">← All Projects</Link>
          </Button>
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
