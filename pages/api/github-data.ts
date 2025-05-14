import { NextApiRequest, NextApiResponse } from 'next';

interface LanguageData {
  [key: string]: number;
}

interface GitHubStats {
  stars: number;
  forks: number;
  repos: number;
  languages: LanguageData;
  activity: GitHubActivity[];
}

interface GitHubActivity {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  message: string;
  time: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username = 'aayushsiwa' } = req.query;

  if (typeof username !== 'string') {
    return res.status(400).json({ error: 'Username must be a string' });
  }

  try {
    // We'll use this token if provided (from environment variables)
    // If not provided, we'll make unauthenticated requests (with lower rate limits)
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch all data concurrently
    const [reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
      fetch(`https://api.github.com/users/${username}/events?per_page=10`, { headers })
    ]);

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error for repos: ${reposResponse.statusText}`);
    }

    if (!eventsResponse.ok) {
      throw new Error(`GitHub API error for events: ${eventsResponse.statusText}`);
    }

    const repos = await reposResponse.json();
    const events = await eventsResponse.json();

    // Process repositories data
    interface Repo {
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      size: number;
    }

    const totalStars = repos.reduce((sum: number, repo: Repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: number, repo: Repo) => sum + repo.forks_count, 0);
    const repoCount = repos.length;

    // Calculate languages
    const languages: LanguageData = {};
    // let totalSize = 0;

    // First collect language data and calculate total size
    repos.forEach((repo: Repo) => {
      if (repo.language && repo.size) {
        languages[repo.language] = (languages[repo.language] || 0) + repo.size;
        // totalSize += repo.size;
      }
    });

    // Process events into activities
    const activities = events
      .map((event: {
        id: string;
        type: string;
        repo: { name: string };
        payload: {
          action?: string;
          commits?: { sha: string }[];
          forkee?: { full_name?: string };
          pull_request?: { number?: number; html_url?: string };
          issue?: { number?: number; html_url?: string };
          comment?: { html_url?: string };
          ref_type?: string;
          ref?: string;
        };
        created_at: string;
      }) => {
        const repo = event.repo.name;
        const repoUrl = `https://github.com/${event.repo.name}`;
        let type = '';
        let message = '';
        let url = repoUrl;

        switch (event.type) {
          case 'PushEvent':
            type = 'commit';
            const commitCount = event.payload.commits?.length || 0;
            message = commitCount === 1 
              ? `Pushed 1 commit`
              : `Pushed ${commitCount} commits`;
            url = event.payload.commits && event.payload.commits.length > 0
              ? `https://github.com/${repo}/commit/${event.payload.commits[0].sha}`
              : repoUrl;
            break;
          
          case 'WatchEvent':
            type = 'star';
            message = `Starred ${repo}`;
            break;
          
          case 'ForkEvent':
            type = 'fork';
            message = `Forked ${repo}`;
            url = `https://github.com/${event.payload.forkee?.full_name || repo}`;
            break;
          
          case 'PullRequestEvent': 
            type = 'pr';
            const prAction = event.payload.action;
            const prNumber = event.payload.pull_request?.number;
            message = `${capitalizeFirstLetter(prAction ?? '')} PR #${prNumber}`;
            url = event.payload.pull_request?.html_url || repoUrl;
            break;
          
          case 'IssuesEvent':
            type = 'issue';
            const issueAction = event.payload.action;
            const issueNumber = event.payload.issue?.number;
            message = `${capitalizeFirstLetter(issueAction ?? '')} issue #${issueNumber}`;
            url = event.payload.issue?.html_url || repoUrl;
            break;
          
          case 'IssueCommentEvent':
            type = 'comment';
            const commentIssue = event.payload.issue?.number;
            message = `Commented on issue #${commentIssue}`;
            url = event.payload.comment?.html_url || repoUrl;
            break;
          
          case 'CreateEvent':
            type = 'create';
            const refType = event.payload.ref_type;
            message = `Created ${refType} ${event.payload.ref || ''}`;
            break;
          
          default:
            return null;
        }

        // Format the time
        const timeAgo = formatTimeAgo(new Date(event.created_at));

        return {
          id: event.id,
          type,
          repo,
          repoUrl,
          message,
          time: timeAgo,
          url
        };
      })
      .filter(Boolean);

    // Combine all data
    const githubData: GitHubStats = {
      stars: totalStars,
      forks: totalForks,
      repos: repoCount,
      languages,
      activity: activities
    };

    // Return the data
    res.status(200).json(githubData);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// Helper function to format time
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}