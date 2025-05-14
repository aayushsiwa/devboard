import Head from "next/head"
import { Box, Typography, Paper } from "@mui/material"

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>DevBoard - Blog Links</title>
        <meta name="description" content="Manage your blog links" />
      </Head>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Links
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>Detailed blog links management will be displayed here.</Typography>
        </Paper>
      </Box>
    </>
  )
}
