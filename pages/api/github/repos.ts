// File: pages/api/github/repos.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";
import { GitHubRepo } from "@/types/github";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "You must be logged in." });

  const includePrivate = req.query.includePrivate === "true";

  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      params: {
        per_page: 100,
        sort: "updated",
      },
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repos = response.data;

    const filteredRepos = includePrivate
      ? repos
      : repos.filter((repo: GitHubRepo) => repo.private === false);

    return res.status(200).json(filteredRepos);
  } catch (error) {
    console.error("Error fetching repos:", error);
    return res.status(500).json({ message: "Error fetching repos" });
  }
}
