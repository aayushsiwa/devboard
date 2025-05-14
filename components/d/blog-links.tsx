"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  TextField,
  IconButton,
  Paper,
  InputAdornment,
  Link,
} from "@mui/material"
import {
  Article as ArticleIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  OpenInNew as ExternalLinkIcon,
  Visibility as EyeIcon,
} from "@mui/icons-material"

interface BlogLink {
  id: string
  title: string
  url: string
  views: number
}

export default function BlogLinks() {
  const [links, setLinks] = useState<BlogLink[]>([
    {
      id: "1",
      title: "Building a Modern Dashboard with Next.js",
      url: "https://example.com/blog/nextjs-dashboard",
      views: 1243,
    },
    {
      id: "2",
      title: "TypeScript Tips for React Developers",
      url: "https://example.com/blog/typescript-react",
      views: 892,
    },
  ])

  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const addLink = () => {
    if (newTitle.trim() && newUrl.trim()) {
      setLinks([
        ...links,
        {
          id: Date.now().toString(),
          title: newTitle.trim(),
          url: newUrl.trim(),
          views: 0,
        },
      ])
      setNewTitle("")
      setNewUrl("")
    }
  }

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArticleIcon fontSize="small" />
            <Typography variant="h6">Blog Links</Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {links.map((link) => (
              <Paper
                key={link.id}
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <Typography variant="subtitle2" noWrap>
                    {link.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <ExternalLinkIcon sx={{ fontSize: 12 }} />
                      {link.url.replace(/^https?:\/\//, "").split("/")[0]}
                    </Link>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <EyeIcon sx={{ fontSize: 12 }} />
                      {link.views.toLocaleString()} views
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" onClick={() => removeLink(link.id)} color="error" sx={{ ml: 1 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Blog title"
            />
            <TextField
              fullWidth
              size="small"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={addLink} disabled={!newTitle.trim() || !newUrl.trim()} edge="end" size="small">
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
