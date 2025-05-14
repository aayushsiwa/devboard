import Head from "next/head"
import { Box, Typography, Paper } from "@mui/material"

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>DevBoard - Skills</title>
        <meta name="description" content="Manage your developer skills" />
      </Head>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Skills Management
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>Detailed skills management will be displayed here.</Typography>
        </Paper>
      </Box>
    </>
  )
}
