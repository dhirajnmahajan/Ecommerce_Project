import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/context/auth-context";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from 'react-router-dom'

const drawerWidth = 240;
const miniDrawerWidth = 64;

function Headers() {

    const { logout } = useContext(AuthContext)
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    // const navigate = useNavigate();

    const profileMenuOpen = Boolean(anchorEl);

    const NavItems = [
        {
            label: "Dashboard",
            path: "/",
            icon: <DashboardIcon />
        },
        {
            label: "Users",
            path: "/users",
            icon: <PeopleIcon />
        },
        {
            label: "Roles",
            path: "/roles",
            icon: <SecurityIcon />
        },
        {
            label: "Settings",
            path: "/settings",
            icon: <SettingsIcon />
        }
    ];

    const toggleDrawer = () => {
        setOpen(prev => !prev);
        document.activeElement?.blur();
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <Box>
            {/* Drawer Toggle */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "flex-end" : "center",
                    px: 1,
                    py: 1
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon
                        sx={{
                            transform: open ? "rotate(0deg)" : "rotate(180deg)",
                            transition: "0.3s"
                        }}
                    />
                </IconButton>
            </Box>

            {/* Navigation */}
            <List>
                {NavItems.map(({ label, icon, path }) => (
                    // <ListItem
                    //     key={label}
                    //     button
                    //     component={Link}
                    //     to={path}
                    //     selected={navigate.pathname === path}
                    //     sx={{
                    //         justifyContent: open ? "initial" : "center",
                    //         px: 2.5
                    //     }}
                    // >
                    //     <ListItemIcon
                    //         sx={{
                    //             minWidth: 0,
                    //             mr: open ? 3 : "auto",
                    //             justifyContent: "center"
                    //         }}
                    //     >
                    //         {icon}
                    //     </ListItemIcon>

                    //     {open && <ListItemText primary={label} />}
                    // </ListItem>
                    <ListItem disablePadding key={path}>
                        <ListItemButton
                            component={Link}
                            to={path}
                            selected={location.pathname === path}
                            sx={{
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                {icon}
                            </ListItemIcon>

                            {open && <ListItemText primary={label} />}
                        </ListItemButton>
                    </ListItem>

                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* HEADER */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    ml: { sm: open ? `${drawerWidth}px` : `${miniDrawerWidth}px` },
                    width: {
                        sm: open
                            ? `calc(100% - ${drawerWidth}px)`
                            : `calc(100% - ${miniDrawerWidth}px)`
                    },
                    transition: "0.3s"
                }}
            >
                <Toolbar>
                    {/* Mobile Menu Button */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>

                    {/* Push Right */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Profile */}
                    <IconButton onClick={handleProfileClick}>
                        <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
                    </IconButton>

                    {/* Profile Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={profileMenuOpen}
                        onClose={handleCloseMenu}
                        disableRestoreFocus
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>

                        <Divider />

                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* MOBILE DRAWER */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={toggleDrawer}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth }
                }}
            >
                {drawer}
            </Drawer>

            {/* DESKTOP MINI DRAWER */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : miniDrawerWidth,
                        overflowX: "hidden",
                        transition: "0.3s"
                    }
                }}
            >
                {drawer}
            </Drawer>

            {/* MAIN CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    ml: { sm: open ? `${drawerWidth}px` : `${miniDrawerWidth}px` },
                    transition: "0.3s"
                }}
            >
                <Typography>
                    Page content goes here
                </Typography>
            </Box>
        </Box>
    );
}

export default Headers;
