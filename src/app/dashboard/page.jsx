"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroEditorForm from "@/components/hero-editor-form";

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Log in to update your portfolio content
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <a href="/api/auth/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name || user.email}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/projects/new">Create New Project</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">Manage Projects</Link>
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button asChild variant="destructive" className="w-full">
                <a href="/api/auth/logout">Sign Out</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <HeroEditorForm />
      </div>
    </div>
  );
}
