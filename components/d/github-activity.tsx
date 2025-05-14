"use client"
import { Card, CardHeader, CardContent, Typography, Box, Avatar, Skeleton, Paper, Link } from "@mui/material"
import {
  Timeline as TimelineIcon,
  Commit as CommitIcon,
  Star as StarIcon,
  MergeType as PullRequestIcon,
  Code as RepoIcon,
  CallSplit as ForkIcon,
  Comment as CommentIcon,
  BugReport as IssueIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"

interface GitHubActivityProps {
  username?: string
  maxActivities?: number
  isLoading?: boolean
  errorMessage?: string | null
  activityData?: {
    id: string
    type: string
    repo: string
    repoUrl: string
    message: string
    time: string
    url: string
  }[]
}

export default function GitHubActivity({ 
  username = "aayushsiwa", 
  maxActivities = 5,
  isLoading = false,
  errorMessage = null,
  activityData = []
}: GitHubActivityProps) {
  // Function to get the appropriate icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <CommitIcon fontSize="small" />;
      case 'star':
        return <StarIcon fontSize="small" />;
      case 'fork':
        return <ForkIcon fontSize="small" />;
      case 'pr':
        return <PullRequestIcon fontSize="small" />;
      case 'issue':
        return <IssueIcon fontSize="small" />;
      case 'comment':
        return <CommentIcon fontSize="small" />;
      default:
        return <RepoIcon fontSize="small" />;
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TimelineIcon fontSize="small" />
            <Typography variant="h6">GitHub Activity</Typography>
          </Box>
        }
      />
      <CardContent>
        {isLoading ? (
          <ActivitySkeleton count={maxActivities} />
        ) : errorMessage ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3, gap: 2 }}>
            <WarningIcon color="error" fontSize="large" />
            <Typography color="error" align="center">
              {errorMessage}
            </Typography>
          </Box>
        ) : activityData.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No recent GitHub activity found for {username}.
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {activityData.slice(0, maxActivities).map((activity) => (
              <Box key={activity.id} sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "background.default" : "grey.100"),
                    color: "text.secondary",
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
                <Box>
                  <Link 
                    href={activity.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "text.primary" }}
                  >
                    <Typography variant="subtitle2">
                      {activity.repo}
                    </Typography>
                  </Link>
                  <Link
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "text.secondary" }}
                  >
                    <Typography variant="body2">
                      {activity.message}
                    </Typography>
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

function ActivitySkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {[...Array(count)].map((_, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="circular" width={36} height={36} />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="30%" height={16} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}