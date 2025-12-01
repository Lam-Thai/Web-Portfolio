import { handleAuth } from "@auth0/nextjs-auth0";

const authHandler = handleAuth();

export const GET = async (req, props) => {
  // Await the params for Next.js 15 compatibility
  const params = await props.params;
  return authHandler(req, { params });
};
