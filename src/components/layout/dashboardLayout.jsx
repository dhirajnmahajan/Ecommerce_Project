import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./header";
import SideDrawer from "./sideDrawer";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function DashboardLayout() {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />

            <Header open={open} toggleDrawer={toggleDrawer} />
            <SideDrawer open={open} toggleDrawer={toggleDrawer} />

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
                {/* {children} */}
                <Outlet />
            </Box>
        </Box>
    );
}
