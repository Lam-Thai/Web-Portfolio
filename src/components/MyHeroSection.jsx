import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function MyHero() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <h1 className="text-4xl font-bold">Your Name</h1>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600">
              Full-stack developer passionate about creating beautiful web
              experiences. Welcome to my portfolio!
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
