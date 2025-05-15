import {
    MenuItem,
    ListItemText,
    ListItemIcon,
    Menu,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { useColorMode } from "../../hooks/ThemeToggleProvider";

function ThemeToggleButton() {
    // const theme = useTheme();
    const { mode, setMode } = useColorMode(); // assumes 'light' | 'dark' | 'system'
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: "light" | "dark" | "system") => {
        setMode(value);
        handleClose();
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <SettingsBrightnessIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary="Theme"
                    secondary={
                        mode
                            ? mode.charAt(0).toUpperCase() + mode.slice(1)
                            : "System"
                    }
                />
                <ArrowRightIcon fontSize="small" />
            </MenuItem>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "right" }}
                transformOrigin={{ vertical: "center", horizontal: "left" }}
            >
                <MenuItem
                    selected={mode === "light"}
                    onClick={() => handleSelect("light")}
                >
                    <ListItemIcon>
                        <LightModeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Light" />
                </MenuItem>
                <MenuItem
                    selected={mode === "dark"}
                    onClick={() => handleSelect("dark")}
                >
                    <ListItemIcon>
                        <DarkModeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dark" />
                </MenuItem>
                <MenuItem
                    selected={mode === "system"}
                    onClick={() => handleSelect("system")}
                >
                    <ListItemIcon>
                        <SettingsBrightnessIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="System" />
                </MenuItem>
            </Menu>
        </>
    );
}

export default ThemeToggleButton;
