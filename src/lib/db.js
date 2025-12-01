"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL);

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
