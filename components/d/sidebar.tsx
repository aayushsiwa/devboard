"use client"

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  GitHub as GitHubIcon,
  Code as CodeIcon,
  Article as ArticleIcon,
  Language as LanguageIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/router"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const DRAWER_WIDTH = 240

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "GitHub Stats",
      path: "/github",
      icon: <GitHubIcon />,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: <CodeIcon />,
    },
    {
      name: "Blog Links",
      path: "/blog",
      icon: <ArticleIcon />,
    },
    {
      name: "Public Portfolio",
      path: "/portfolio",
      icon: <LanguageIcon />,
    },
  ]

  const drawer = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          DevBoard
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {routes.map((route) => (
          <ListItem key={route.path} disablePadding>
            <Link href={route.path} passHref legacyBehavior>
              <ListItemButton
                component="a"
                selected={router.pathname === route.path}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: router.pathname === route.path ? "inherit" : "text.secondary",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  )
}
