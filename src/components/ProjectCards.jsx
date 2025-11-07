import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ProjectPreviewCard({ count = 5 }) {
  const projects = [
    {
      title: "Tandem",
      desc: "an AI-powered app that helps trade parents manage unpredictable work schedules by finding reliable childcare and sharing nannies with others nearby. This makes childcare flexible, affordable, and easy to organize.",
      img: "https://placehold.co/300x200.png",
      link: "https://tandem-git-dev-matheus-demeis-projects-4bff4ed5.vercel.app/calendar",
    },
    {
      title: "Expenses Tracker",
      desc: "An app to track personal expenses",
      img: "/images/dollar.png",
      link: "https://expenses-app-3ebn.onrender.com/",
    },
    {
      title: "Passport.js Auth",
      desc: "Authentication system using Passport.js",
      img: "/images/passport.png",
      link: "https://github.com/Lam-Thai/passport-lab",
    },
    {
      title: "Image Converter",
      desc: "A tool to convert images between different formats",
      img: "/images/image.png",
      link: "https://github.com/Lam-Thai/image-lab",
    },
    {
      title: "Temperature Converter",
      desc: "A tool to convert temperatures between different units",
      img: "/images/temperature.png",
      link: "https://github.com/Lam-Thai/temperature-convert",
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
              <Image
                src={project.img}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
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
