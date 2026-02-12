import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenu from "./profileMenu";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function Header({ open, toggleMobileDrawer }) {
    const location = useLocation();

    // header titles 
    const routeTitles = {
        "/dashboard": "Dashboard",
        "/dashboard/products": "Products",
        "/dashboard/profilecard": "User",
        // "/settings": "Settings"
    };

    const title = routeTitles[location.pathname] || "Dashboard";

    return (
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
                {/* Mobile hamburger */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={toggleMobileDrawer}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Dynamic title */}
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <ProfileMenu />
            </Toolbar>
        </AppBar>
    );
}
