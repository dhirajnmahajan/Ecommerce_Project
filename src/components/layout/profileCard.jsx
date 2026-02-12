import React, { useContext } from "react";
import {
    Box,
    Paper,
    Grid,
    Avatar,
    Typography,
    Stack,
    Button,
    Chip,
    Divider
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../../auth/context/auth-context";
import { useNavigate } from "react-router";

export default function ProfileCardPro() {

    const { user, logout } = useContext(AuthContext) || {};
    const navigate = useNavigate()

    const first = user?.firstname || "";
    const last = user?.lastname || "";
    const email = user?.email || "";
    const role = user?.role || "User";
    const avatarSrc = user?.avatar || null;

    const initials =
        first?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase() || "U";

    const onBack = () => {
        navigate(-1)
    }
    const onEdit = () => {
        navigate('/dashboard/profilecard/edit')
    }

    const onPassword = () => {
        navigate('/dashboard/profilecard/password')
    }

    const onLogout = () => {
        logout()
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1300,
                mx: "auto",
                px: { xs: 2, sm: 3, md: 4 },
                mt: { xs: 2, md: 4 }
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        color: "#fff",
                        px: { xs: 2, md: 4 },
                        py: { xs: 3, md: 4 },
                        position: "relative"
                    }}
                >
                    <Grid container alignItems="center" spacing={2} sx={{ mb: 4 }}>
                        {/* Back + title */}
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <ArrowBackIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={onBack}
                                />
                            </Stack>
                        </Grid>


                    </Grid>

                    {/* Avatar centered inside header */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -70,
                            left: { xs: "50%", md: 60 },
                            transform: { xs: "translateX(-50%)", md: "none" }
                        }}
                    >
                        <Avatar
                            src={user?.imageUrl || avatarSrc || undefined}
                            sx={{
                                width: { xs: 120, md: 150 },
                                height: { xs: 120, md: 150 },
                                fontSize: 56,
                                bgcolor: avatarSrc ? undefined : "primary.light",
                                boxShadow: 7,
                                border: "4px solid white"
                            }}
                        >
                            {!avatarSrc && initials}
                        </Avatar>
                    </Box>

                    {/* Header buttons */}
                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="row"
                            spacing={1.5}
                            justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<EditOutlinedIcon />}
                                onClick={onEdit}
                                sx={{
                                    bgcolor: "#fff",
                                    color: "primary.main",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#f5f5f5" }
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<LockOutlinedIcon />}
                                onClick={onPassword}
                                sx={{
                                    color: "#fff",
                                    borderColor: "#fff",
                                    textTransform: "none",
                                    "&:hover": {
                                        borderColor: "#fff",
                                        bgcolor: "rgba(255,255,255,0.1)"
                                    }
                                }}
                            >
                                Update Password
                            </Button>
                        </Stack>
                    </Grid>

                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        pt: { xs: 10, md: 12 },
                        pb: 4,
                        px: { xs: 3, md: 6 }
                    }}
                >
                    <Grid container spacing={4}>
                        {/* User summary */}
                        <Grid item xs={12} md={4}>
                            <Stack
                                spacing={1}
                                alignItems={{ xs: "center", md: "flex-start" }}
                                textAlign={{ xs: "center", md: "left" }}
                            >
                                <Typography variant="h5" fontWeight={700}>
                                    {first} {last}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {email}
                                </Typography>

                                <Chip
                                    label={role}
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        bgcolor: "warning.light",
                                        fontWeight: 600
                                    }}
                                />
                            </Stack>
                        </Grid>

                        {/* Info section */}
                        <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                                <Typography variant="h6" fontWeight={7400}>
                                    Profile Information
                                </Typography>

                                <Divider />

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" color="text.secondary">
                                            First Name
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {first || "-"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" color="text.secondary">
                                            Last Name
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {last || "-"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="caption" color="text.secondary">
                                            Email Address
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {email || "-"}
                                        </Typography>
                                    </Grid>

                                    {/* <Grid item xs={12}>
                                        <Typography variant="caption" color="text.secondary">
                                            Role
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {role || "-"}
                                        </Typography>
                                    </Grid> */}
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Footer */}
                    <Box
                        sx={{
                            mt: 5,
                            pt: 3,
                            borderTop: "1px solid #e0e0e0",
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            onClick={onLogout}
                            sx={{ textTransform: "none" }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
