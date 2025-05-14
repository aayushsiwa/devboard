"use client"

import type React from "react"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material"
import { Code as CodeIcon, Add as AddIcon } from "@mui/icons-material"

export default function SkillsCard() {
  const [skills, setSkills] = useState([
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Material UI",
    "GraphQL",
    "PostgreSQL",
    "Docker",
  ])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CodeIcon fontSize="small" />
            <Typography variant="h6">Skills</Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => removeSkill(skill)}
                sx={{
                  bgcolor: (theme) => (theme.palette.mode === "dark" ? "background.default" : "grey.100"),
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            size="small"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={addSkill} disabled={!newSkill.trim()} edge="end" size="small">
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
