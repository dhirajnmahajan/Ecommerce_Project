import React from "react";
import {
    Drawer,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Tooltip
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function SideDrawer({
    open,
    toggleDrawer,
    mobileOpen,
    toggleMobileDrawer
}) {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/dashboard", tooltipTitle: "Dashboard", icon: <DashboardIcon /> },
        { label: "Products", path: "/dashboard/products", tooltipTitle: "Products", icon: <InventoryIcon /> },
        { label: "User", path: "/dashboard/profilecard", tooltipTitle: "User", icon: <SecurityIcon /> },
        { label: "Settings", path: "", tooltipTitle: "Settings", icon: <SettingsIcon /> }
    ];

    const drawerContent = (
        <Box sx={{ height: "100%" }}>
            {/* HEADER AREA */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "space-between" : "center",
                    px: 2,
                    py: 1.5
                }}
            >
                {/* Title visible on mobile and open desktop */}
                {open && (
                    <Typography variant="h6" fontWeight={600}>
                        BuyNow
                    </Typography>
                )}

                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon
                        sx={{
                            transform: open ? "rotate(0deg)" : "rotate(180deg)",
                            transition: "0.3s"
                        }}
                    />
                </IconButton>
            </Box>

            <Divider />

            {/* NAVIGATION */}
            <List>
                {navItems.map(({ label, icon, path, tooltipTitle }) => (
                    <ListItem disablePadding key={path}>
                        <ListItemButton
                            component={Link}
                            to={path}
                            selected={location.pathname === path}
                            onClick={toggleMobileDrawer}
                            sx={{
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                                py: 1.2
                            }}
                        >
                            <Tooltip title={tooltipTitle} placement="right-start" arrow>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center"
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                            </Tooltip>

                            {open && <ListItemText primary={label} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* Desktop drawer */}
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

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={toggleMobileDrawer}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
