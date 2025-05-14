import Head from "next/head"
import { Box, Typography, Paper } from "@mui/material"

export default function GitHubPage() {
  return (
    <>
      <Head>
        <title>DevBoard - GitHub Stats</title>
        <meta name="description" content="View your GitHub statistics" />
      </Head>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GitHub Stats
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>Detailed GitHub statistics will be displayed here.</Typography>
        </Paper>
      </Box>
    </>
  )
}
