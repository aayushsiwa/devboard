import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  try {
    const response = await axios.get("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    console.log("fetch");
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("GitHub API Error:", error);
    return res.status(500).json({ message: "Error fetching GitHub rate limit data", error });
  }
}