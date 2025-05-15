import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Switch,
    FormControlLabel,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import ThemeToggleButton from "./dashboard/ThemeToggle"; // Assuming you have a ThemeToggle component

interface HeaderProps {
    onRefresh: () => void;
    showRateLimit: boolean;
    toggleRateLimit: () => void;
    showPrivateRepos: boolean;
    togglePrivateRepos: () => void;
}

const Header = ({ onRefresh, showRateLimit, toggleRateLimit, showPrivateRepos,togglePrivateRepos }: HeaderProps) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" elevation={1}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <motion.div
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="github"
                                sx={{ mr: 1 }}
                            >
                                <GitHubIcon />
                            </IconButton>
                        </motion.div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ fontWeight: 700 }}
                        >
                            GitHub Stats Dashboard
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                // color="primary"
                                sx={{
                                    color: "primary.dark",
                                    backgroundColor: "primary.light",
                                }}
                                size="small"
                                onClick={onRefresh}
                            >
                                Refresh
                            </Button>
                        </motion.div>

                        {session && (
                            <Box>
                                <IconButton onClick={handleAvatarClick}>
                                    <Avatar
                                        src={session.user?.image || ""}
                                        alt={session.user?.name || "User"}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <ThemeToggleButton
                                    // handleClose={handleClose}
                                    />
                                    {/* <MenuItem>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={showPrivateRepos}
                                                    onChange={
                                                        togglePrivateRepos
                                                    }
                                                />
                                            }
                                            label="Show Private Repos"
                                        />
                                    </MenuItem> */}

                                    <MenuItem>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={showRateLimit}
                                                    onChange={toggleRateLimit}
                                                />
                                            }
                                            label="Show Rate Limit"
                                        />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            signOut({
                                                callbackUrl: "/auth/signin",
                                            });
                                            handleClose();
                                        }}
                                    >
                                        <ExitToAppIcon
                                            fontSize="small"
                                            sx={{ mr: 1 }}
                                        />{" "}
                                        Sign Out
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;