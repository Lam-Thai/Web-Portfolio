import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ProjectPreviewCard({ count = 3 }) {
  const projects = [
    {
      title: "Expenses Tracker",
      desc: "An app to track personal expenses",
      img: "https://placehold.co/300x200.png",
      link: "https://github.com/Lam-Thai/Expenses-App",
    },
    {
      title: "Passport.js Auth",
      desc: "Authentication system using Passport.js",
      img: "https://placehold.co/300x200.png",
      link: "https://github.com/Lam-Thai/passport-lab",
    },
    {
      title: "Image Converter",
      desc: "A tool to convert images between different formats",
      img: "https://placehold.co/300x200.png",
      link: "https://github.com/Lam-Thai/image-lab",
    },
  ];

  const displayedProjects = projects.slice(0, count);

  return (
    <div id="projects" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {displayedProjects.map((project, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <Skeleton className="w-full h-48" />
            </CardHeader>
            <CardContent className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.desc}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={project.link}>View Project</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
