import Head from "next/head"
import { Box, Typography, Paper } from "@mui/material"

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>DevBoard - Portfolio</title>
        <meta name="description" content="Manage your public portfolio" />
      </Head>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Public Portfolio
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>Portfolio management and generation will be displayed here.</Typography>
        </Paper>
      </Box>
    </>
  )
}
