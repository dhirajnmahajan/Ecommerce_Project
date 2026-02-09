import React, { useState, useContext } from "react";
import { IconButton, Avatar, Menu, MenuItem, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/auth-context";

export default function ProfileMenu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const goToProfile = () => {
        handleClose();
        navigate('/dashboard/profile');
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem>
                    <Typography variant="body2" fontStyle='italic' color="text.secondary">
                        {user.email}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={goToProfile}>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/dashboard/settings")}>
                    Settings
                </MenuItem>

                <Divider />

                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
