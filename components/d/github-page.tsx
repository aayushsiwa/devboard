"use client"
import { useState, useEffect } from "react"
import { Grid, Box } from "@mui/material"
import GitHubStats from "@/components/d/github-stats"
import GitHubActivity from "@/components/d/github-activity"
import DashboardHeader from "@/components/d/dashboard-header"

interface GitHubPageProps {
  defaultUsername?: string
}

interface GitHubData {
  stars: number
  forks: number
  repos: number
  languages: {
    [key: string]: number
  }
  activity: {
    id: string
    type: string
    repo: string
    repoUrl: string
    message: string
    time: string
    url: string
  }[]
}

export default function GitHubPage({ defaultUsername = "aayushsiwa" }: GitHubPageProps) {
  const [username, setUsername] = useState(defaultUsername)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<GitHubData | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/github-data?username=${username}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || `Error: ${response.status}`)
        }
        
        const githubData = await response.json()
        setData(githubData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data')
        console.error('Error fetching GitHub data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  return (
    <Box sx={{ p: 3 }}>
      <DashboardHeader 
        name="Developer" 
        title="Track your GitHub contributions and activity" 
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GitHubStatsContainer 
            username={username}
            loading={loading}
            error={error}
            stars={data?.stars || 0}
            forks={data?.forks || 0}
            repos={data?.repos || 0}
            languages={data?.languages || {}}
          />
        </Grid>
        <Grid item xs={12}>
          <GitHubActivityContainer 
            username={username}
            loading={loading}
            error={error}
            activities={data?.activity || []}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

// Container components that take the API data and pass it to our UI components

interface GitHubStatsContainerProps {
  username: string
  loading: boolean
  error: string | null
  stars: number
  forks: number
  repos: number
  languages: {
    [key: string]: number
  }
}

function GitHubStatsContainer({ 
  username, 
  loading, 
  error,
  stars,
  forks,
  repos,
  languages
}: GitHubStatsContainerProps) {
  return (
    <GitHubStats 
      username={username}
      isLoading={loading}
      errorMessage={error}
      statsData={{
        stars,
        forks,
        repos,
        languages
      }}
    />
  )
}

interface GitHubActivityContainerProps {
  username: string
  loading: boolean
  error: string | null
  activities: {
    id: string
    type: string
    repo: string
    repoUrl: string
    message: string
    time: string
    url: string
  }[]
}

function GitHubActivityContainer({
  username,
  loading,
  error,
  activities
}: GitHubActivityContainerProps) {
  return (
    <GitHubActivity 
      username={username}
      isLoading={loading}
      errorMessage={error}
      activityData={activities}
    />
  )
}