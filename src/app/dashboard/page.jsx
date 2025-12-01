import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Dashboard - Tuoc Lam Thai",
  description: "Admin dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.email}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <h2 className="text-xl font-semibold mb-3">User Info</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email
                </dt>
                <dd className="text-sm">{session.user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd className="text-sm">{session.user.name || "Not set"}</dd>
              </div>
            </dl>
          </div>

          <div className="pt-6 border-t">
            <Button asChild variant="destructive" className="w-full">
              <a href="/api/auth/logout">Sign Out</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
