import React from "react";
import {
    Drawer,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function SideDrawer({ open, toggleDrawer }) {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { label: "Products", path: "/dashboard/products", icon: <InventoryIcon /> },
        { label: "User", path: "", icon: <SecurityIcon /> },
        { label: "Settings", path: "/settings", icon: <SettingsIcon /> }
    ];

    const drawerContent = (
        <Box>
            <Box
                sx={{
                    display: "flex",
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

            <List>
                {navItems.map(({ label, icon, path }) => (
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
            open={open}
        >
            {drawerContent}
        </Drawer>
    );
}
