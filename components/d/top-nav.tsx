"use client";

import type React from "react";

import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    Box,
    Divider,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/hooks/ThemeToggleProvider";

interface TopNavProps {
    onMenuButtonClick: () => void;
}

export default function TopNav({ onMenuButtonClick }: TopNavProps) {
    const { mode } = useColorMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuButtonClick}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 600 }}
                >
                    DevBoard
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit" size="large">
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title={mode === "dark" ? "Light mode" : "Dark mode"}
                    >
                        <IconButton
                            onClick={() => {
                                document.body.classList.toggle("dark-mode");
                                localStorage.setItem(
                                    "theme",
                                    mode === "dark" ? "light" : "dark"
                                );
                            }}
                            color="inherit"
                            size="large"
                        >
                            {mode === "dark" ? (
                                <LightModeIcon />
                            ) : (
                                <DarkModeIcon />
                            )}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Account">
                        <IconButton
                            onClick={handleMenu}
                            size="small"
                            sx={{ ml: 1 }}
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>SJ</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
