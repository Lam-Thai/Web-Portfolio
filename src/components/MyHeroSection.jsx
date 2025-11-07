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
            <h1 className="text-4xl font-bold">Tuoc Lam Thai</h1>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600">
              I specialize in building modern, scalable web applications using
              tools like React, Next.js, and Node.js, with strong skills in both
              frontend and backend development. My background in graphic design
              helps me create clean, user-friendly interfaces with a strong
              visual impact. Currently studying Full-Stack Web Development at
              BCIT, I’m passionate about solving problems through code and
              design, from building authentication systems to crafting
              interactive digital experiences.
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
