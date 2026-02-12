import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./header";
import SideDrawer from "./sideDrawer";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function DashboardLayout() {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    const toggleMobileDrawer = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />

            {/* Pass mobile toggle to header */}
            <Header
                open={open}
                toggleMobileDrawer={toggleMobileDrawer}
            />

            {/* Sidebar */}
            <SideDrawer
                open={open}
                toggleDrawer={toggleDrawer}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* MAIN CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    mt: 8,
                    width: '100%',
                    ml: {
                        sm: open
                            ? `${drawerWidth}px`
                            : `${miniDrawerWidth}px`
                    },
                    transition: "0.3s"
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
