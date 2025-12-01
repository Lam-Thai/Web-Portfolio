import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL);

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text NOT NULL,
        image text NOT NULL,
        link text NOT NULL,
        keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `;

    console.log("✅ Table created");

    // Seed initial projects
    const projects = [
      {
        title: "Tandem",
        description:
          "An AI-powered app that helps trade parents manage unpredictable work schedules by finding reliable childcare and sharing nannies with others nearby.",
        image: "https://placehold.co/600x400/png",
        link: "https://tandem-git-dev-matheus-demeis-projects-4bff4ed5.vercel.app/calendar",
        keywords: ["React", "AI", "Childcare"],
      },
      {
        title: "Expenses Tracker",
        description:
          "An app to track personal expenses and manage your budget effectively.",
        image: "/images/dollar.png",
        link: "https://expenses-app-3ebn.onrender.com/",
        keywords: ["Finance", "Budgeting", "Tracking"],
      },
      {
        title: "Passport.js Auth",
        description:
          "Authentication system using Passport.js with multiple strategies.",
        image: "/images/passport.png",
        link: "https://github.com/Lam-Thai/passport-lab",
        keywords: ["Auth", "Security", "Node.js"],
      },
    ];

    for (const project of projects) {
      await sql`
        INSERT INTO projects (title, description, image, link, keywords)
        VALUES (
          ${project.title},
          ${project.description},
          ${project.image},
          ${project.link},
          ${JSON.stringify(project.keywords)}::jsonb
        )
        ON CONFLICT DO NOTHING
      `;
    }

    console.log("✅ Projects seeded successfully!");
    console.log("🎉 Database setup complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
