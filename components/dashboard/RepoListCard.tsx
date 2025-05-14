import { useState } from "react";
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip,
    Box,
    Divider,
    IconButton,
    Skeleton,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubRepo } from "../../types/github";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CodeIcon from "@mui/icons-material/Code";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import { formatDistance } from "date-fns";

interface RepoListCardProps {
    repos: GitHubRepo[] | null;
    loading: boolean;
}

const RepoListCard = ({ repos, loading }: RepoListCardProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("updated");

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const sortedAndFilteredRepos = repos
        ? repos
              .filter(
                  (repo) =>
                      repo.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                      (repo.description &&
                          repo.description
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()))
              )
              .sort((a, b) => {
                  switch (sortBy) {
                      case "stars":
                          return b.stargazers_count - a.stargazers_count;
                      case "forks":
                          return b.forks_count - a.forks_count;
                      case "name":
                          return a.name.localeCompare(b.name);
                      case "updated":
                      default:
                          return (
                              new Date(b.updated_at).getTime() -
                              new Date(a.updated_at).getTime()
                          );
                  }
              })
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <Paper elevation={0} sx={{ height: "100%" }}>
                <Box sx={{ p: 3, pb: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Repositories
                    </Typography>

                    {!loading && repos && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <TextField
                                placeholder="Search repositories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="small"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel id="sort-select-label">
                                    Sort by
                                </InputLabel>
                                <Select
                                    labelId="sort-select-label"
                                    id="sort-select"
                                    value={sortBy}
                                    label="Sort by"
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value="updated">
                                        Recently Updated
                                    </MenuItem>
                                    <MenuItem value="stars">Stars</MenuItem>
                                    <MenuItem value="forks">Forks</MenuItem>
                                    <MenuItem value="name">Name</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </Box>

                {loading ? (
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                            p: 0,
                        }}
                    >
                        {[...Array(5)].map((_, index) => (
                            <Box key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{ px: 3 }}
                                >
                                    <Box sx={{ width: "100%" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                mb: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width="40%"
                                                height={30}
                                            />
                                            <Skeleton
                                                variant="circular"
                                                width={32}
                                                height={32}
                                            />
                                        </Box>
                                        <Skeleton variant="text" width="70%" />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                mt: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="rounded"
                                                width={70}
                                                height={24}
                                            />
                                            <Skeleton
                                                variant="rounded"
                                                width={70}
                                                height={24}
                                            />
                                        </Box>
                                    </Box>
                                </ListItem>
                                {index < 4 && <Divider component="li" />}
                            </Box>
                        ))}
                    </List>
                ) : repos && repos.length > 0 ? (
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                            p: 0,
                        }}
                    >
                        <AnimatePresence>
                            {sortedAndFilteredRepos.map((repo, index) => (
                                <motion.div
                                    key={repo.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{ px: 3, display: "block" }}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="open repository"
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <OpenInNewIcon />
                                            </IconButton>
                                        }
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            "secondary.main",
                                                    }}
                                                >
                                                    <CodeIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={500}
                                                    >
                                                        {repo.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    repo.description && (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.primary"
                                                            sx={{ mt: 0.5 }}
                                                        >
                                                            {repo.description}
                                                        </Typography>
                                                    )
                                                }
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 1,
                                                mt: 1,
                                                ml: 7, // align under text (Avatar + spacing)
                                            }}
                                        >
                                            {repo.language && (
                                                <Chip
                                                    size="small"
                                                    label={repo.language}
                                                    variant="outlined"
                                                    sx={{ height: 24 }}
                                                />
                                            )}
                                            <Chip
                                                icon={
                                                    <StarIcon
                                                        sx={{
                                                            fontSize:
                                                                "0.8rem !important",
                                                        }}
                                                    />
                                                }
                                                size="small"
                                                label={repo.stargazers_count}
                                                variant="outlined"
                                                sx={{ height: 24 }}
                                            />
                                            <Chip
                                                icon={
                                                    <ForkRightIcon
                                                        sx={{
                                                            fontSize:
                                                                "0.8rem !important",
                                                        }}
                                                    />
                                                }
                                                size="small"
                                                label={repo.forks_count}
                                                variant="outlined"
                                                sx={{ height: 24 }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    ml: "auto",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                Updated{" "}
                                                {formatDistance(
                                                    new Date(repo.updated_at),
                                                    new Date(),
                                                    {
                                                        addSuffix: true,
                                                    }
                                                )}
                                            </Typography>
                                        </Box>
                                    </ListItem>

                                    {index <
                                        sortedAndFilteredRepos.length - 1 && (
                                        <Divider component="li" />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {sortedAndFilteredRepos.length === 0 && (
                            <ListItem>
                                <ListItemText
                                    primary="No repositories found"
                                    secondary="Try changing your search query"
                                    primaryTypographyProps={{ align: "center" }}
                                    secondaryTypographyProps={{
                                        align: "center",
                                    }}
                                />
                            </ListItem>
                        )}
                    </List>
                ) : (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="body1" align="center">
                            No repositories available
                        </Typography>
                    </Box>
                )}
            </Paper>
        </motion.div>
    );
};

export default RepoListCard;
