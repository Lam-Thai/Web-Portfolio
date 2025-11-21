import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound({
  message = "The page you're looking for doesn't exist.",
}) {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <h1 className="text-6xl font-bold text-muted-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
