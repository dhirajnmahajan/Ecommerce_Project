// import React, { useState, useContext } from "react";
// import { IconButton, Avatar, Menu, MenuItem, Divider, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../auth/context/auth-context";

// export default function ProfileMenu() {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = useState(null);

//     const open = Boolean(anchorEl);

//     const goToProfile = () => {
//         handleClose();
//         navigate('/dashboard/profile');
//     };

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <>
//             <IconButton onClick={handleClick}>
//                 <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
//             </IconButton>

//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//             >
//                 <MenuItem onClick={goToProfile}>
//                     {user.firstname}
//                 </MenuItem>
//                 <MenuItem>
//                     <Typography variant="body2" fontStyle='italic' color="text.secondary">
//                         {user.email}
//                     </Typography>
//                 </MenuItem>
//                 <MenuItem onClick={goToProfile}>
//                     Profile
//                 </MenuItem>
//                 <MenuItem onClick={() => navigate("/dashboard/settings")}>
//                     Settings
//                 </MenuItem>

//                 <Divider />

//                 <MenuItem onClick={logout}>
//                     Logout
//                 </MenuItem>
//             </Menu>
//         </>
//     );
// }


import React, { useState, useContext } from "react";
import {
    Avatar,
    Box,
    Menu,
    MenuItem,
    Typography,
    Divider,
    Chip,
    ListItemIcon
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/auth-context";


function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext);

    const handleOpen = (event) => {
        console.log(user);

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onProfile = () => {
        setAnchorEl(null);
        navigate('/dashboard/profilecard')
    }
    const onSettings = () => {
        setAnchorEl(null);
    }
    const onLogout = () => {
        logout()
    }

    return (
        <>
            <Avatar
                sx={{ cursor: "pointer" }}
                onClick={handleOpen}
            >
                {user?.firstname?.[0] || "U"}
            </Avatar>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 220, p: 1.5 }
                }}
            >
                {/* User Info */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 1 }}>
                    <Avatar>
                        {user?.firstname?.[0] || "U"}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">
                            {user?.firstname || "User"}
                        </Typography>

                        {/* <Typography variant="body2" color="text.secondary">
                            {user?.email || "user@email.com"}
                        </Typography> */}

                        <Chip
                            label={user?.email || "Account Owner"}
                            size="small"
                            sx={{ mt: 0.5 }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={onProfile}>
                    <ListItemIcon>
                        <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>

                <MenuItem onClick={onSettings}>
                    <ListItemIcon>
                        <SettingsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default ProfileMenu;

