// GET /api/projects
export async function GET() {
  const projects = [
    {
      title: "Tandem",
      description:
        "An AI-powered app that helps trade parents manage unpredictable work schedules by finding reliable childcare and sharing nannies with others nearby. This makes childcare flexible, affordable, and easy to organize.",
      image: "/images/placeholder-300x300.png",
      link: "https://tandem-git-dev-matheus-demeis-projects-4bff4ed5.vercel.app/calendar",
      keywords: [
        "Next.js",
        "React",
        "TailwindCSS",
        "Drizzle",
        "NeonDB",
        "TypeScript",
        "AI",
        "Vercel",
      ],
    },
    {
      title: "Expenses Tracker",
      description:
        "An app to track personal expenses with detailed analytics and reporting features.",
      image: "/images/dollar.png",
      link: "https://expenses-app-3ebn.onrender.com",
      keywords: [
        "TypeScript",
        "Bun.js",
        "Hono",
        "Zod",
        "TailwindCSS",
        "Next.js",
        "React",
      ],
    },
    {
      title: "Passport.js Auth",
      description:
        "Authentication system using Passport.js with multiple strategies including local and OAuth.",
      image: "/images/passport.png",
      link: "https://github.com/Lam-Thai/passport-lab",
      keywords: ["TypeScript", "Passport.js", "EJS", "Node.js"],
    },
    {
      title: "Image Converter",
      description:
        "A tool to convert images between different formats with compression options.",
      image: "/images/image.png",
      link: "https://github.com/Lam-Thai/image-lab",
      keywords: ["JavaScript", "HTML", "CSS"],
    },
    {
      title: "Temperature Converter",
      description:
        "A tool to convert temperatures between different units (Celsius, Fahrenheit, Kelvin).",
      image: "/images/temperature.png",
      link: "https://github.com/Lam-Thai/temperature-convert",
      keywords: ["JavaScript", "HTML", "CSS"],
    },
  ];

  return Response.json({ projects });
}
