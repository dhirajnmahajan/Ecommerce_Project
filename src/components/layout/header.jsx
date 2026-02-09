import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenu from "./profileMenu";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function Header({ open, toggleDrawer }) {
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

                <Box sx={{ flexGrow: 1 }} />

                <ProfileMenu />
            </Toolbar>
        </AppBar>
    );
}
