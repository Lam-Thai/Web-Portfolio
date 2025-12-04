"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL);

const HERO_PLACEHOLDER_AVATAR = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
const defaultHeroContent = {
  avatar: HERO_PLACEHOLDER_AVATAR,
  fullName: "Your Name",
  shortDescription: "Full-Stack Developer | React & Next.js Specialist",
  longDescription:
    "I specialize in building modern, scalable web applications using tools like React, Next.js, and Node.js.",
};

function mapHeroRow(row) {
  return {
    id: row.id,
    avatar: row.avatar || HERO_PLACEHOLDER_AVATAR,
    fullName: row.full_name || defaultHeroContent.fullName,
    shortDescription:
      row.short_description || defaultHeroContent.shortDescription,
    longDescription: row.long_description || defaultHeroContent.longDescription,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function ensureHeroTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS hero (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      avatar text NOT NULL DEFAULT '',
      full_name text NOT NULL,
      short_description text NOT NULL CHECK (char_length(short_description) <= 120),
      long_description text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const [{ count }] = await sql`SELECT count(*)::int as count FROM hero`;
  if (Number(count) === 0) {
    await sql`
      INSERT INTO hero (avatar, full_name, short_description, long_description)
      VALUES (
        ${defaultHeroContent.avatar},
        ${defaultHeroContent.fullName},
        ${defaultHeroContent.shortDescription},
        ${defaultHeroContent.longDescription}
      )
    `;
  }
}

export async function getHero() {
  await ensureHeroTable();
  const [row] = await sql`
    SELECT id, avatar, full_name, short_description, long_description,
           created_at as "createdAt", updated_at as "updatedAt"
    FROM hero
    ORDER BY created_at ASC
    LIMIT 1
  `;
  return row ? mapHeroRow(row) : defaultHeroContent;
}

export async function upsertHero(updates = {}) {
  await ensureHeroTable();
  const current = await getHero();

  const merged = {
    avatar: updates.avatar ?? current.avatar ?? HERO_PLACEHOLDER_AVATAR,
    fullName:
      updates.fullName ?? current.fullName ?? defaultHeroContent.fullName,
    shortDescription:
      updates.shortDescription ??
      current.shortDescription ??
      defaultHeroContent.shortDescription,
    longDescription:
      updates.longDescription ??
      current.longDescription ??
      defaultHeroContent.longDescription,
  };

  if (current.id) {
    const [row] = await sql`
      UPDATE hero
      SET avatar = ${merged.avatar},
          full_name = ${merged.fullName},
          short_description = ${merged.shortDescription},
          long_description = ${merged.longDescription},
          updated_at = now()
      WHERE id = ${current.id}
      RETURNING id, avatar, full_name, short_description, long_description,
                created_at as "createdAt", updated_at as "updatedAt"
    `;
    return mapHeroRow(row);
  } else {
    const [row] = await sql`
      INSERT INTO hero (avatar, full_name, short_description, long_description)
      VALUES (${merged.avatar}, ${merged.fullName}, ${merged.shortDescription}, ${merged.longDescription})
      RETURNING id, avatar, full_name, short_description, long_description,
                created_at as "createdAt", updated_at as "updatedAt"
    `;
    return mapHeroRow(row);
  }
}

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    link: row.link,
    keywords: Array.isArray(row.keywords) ? row.keywords : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function ensureProjectsTable() {
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
}

export async function fetchProjects() {
  const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
  return rows.map(mapProject);
}

export async function getProjectById(id) {
  const rows = await sql`SELECT * FROM projects WHERE id = ${id} LIMIT 1`;
  return rows.length > 0 ? mapProject(rows[0]) : null;
}

export async function insertProject(data) {
  const rows = await sql`
    INSERT INTO projects (title, description, image, link, keywords)
    VALUES (${data.title}, ${data.description}, ${data.image}, ${
    data.link
  }, ${JSON.stringify(data.keywords)}::jsonb)
    RETURNING *
  `;
  return mapProject(rows[0]);
}

export async function updateProject(id, updates) {
  const fields = [];
  const values = [];

  if (updates.title !== undefined) {
    fields.push("title");
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push("description");
    values.push(updates.description);
  }
  if (updates.image !== undefined) {
    fields.push("image");
    values.push(updates.image);
  }
  if (updates.link !== undefined) {
    fields.push("link");
    values.push(updates.link);
  }
  if (updates.keywords !== undefined) {
    fields.push("keywords");
    values.push(JSON.stringify(updates.keywords));
  }

  if (fields.length === 0) return null;

  const setClauses = fields
    .map((field, i) =>
      field === "keywords"
        ? `${field} = $${i + 1}::jsonb`
        : `${field} = $${i + 1}`
    )
    .join(", ");

  const rows = await sql(
    `UPDATE projects 
     SET ${setClauses}, updated_at = now() 
     WHERE id = $${fields.length + 1} 
     RETURNING *`,
    [...values, id]
  );

  return rows.length > 0 ? mapProject(rows[0]) : null;
}

export async function deleteProject(id) {
  const rows = await sql`DELETE FROM projects WHERE id = ${id} RETURNING *`;
  return rows.length > 0 ? mapProject(rows[0]) : null;
}
