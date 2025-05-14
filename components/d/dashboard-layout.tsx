"use client"

import type React from "react"

import { useState } from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import TopNav from "./top-nav"
import Sidebar from "./sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <TopNav onMenuButtonClick={handleToggleSidebar} />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "background.default" : "grey.50"),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
