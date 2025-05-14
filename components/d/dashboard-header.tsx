import { Box, Typography } from "@mui/material"

interface DashboardHeaderProps {
  name: string
  title: string
}

export default function DashboardHeader({ name, title }: DashboardHeaderProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Welcome back, {name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </Box>
  )
}
