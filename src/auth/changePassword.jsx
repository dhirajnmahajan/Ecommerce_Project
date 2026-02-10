import React, { useContext } from "react";
import {
    Box,
    Button,
    Paper,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/auth-context";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controler } from "../components";

function ChangePassword() {
    const { changePassword } = useContext(AuthContext);
    const navigate = useNavigate();

    // validation passwordSchema
    const passwordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Current password is required"),

        newPassword: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("New password is required"),

        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("newPassword")],
                "Passwords must match"
            )
            .required("Confirm password is required")
    });

    const methods = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await changePassword(data);
            alert("Password updated successfully");
            navigate("/auth/login");
        } catch (error) {
            alert(error.message);
        }
    });

    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 4,
                px: 2
            }}
        >
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" mb={3}>
                    Change Password
                </Typography>

                <form onSubmit={onSubmit}>
                    <Controler
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        control={control}
                    />

                    <Controler
                        name="newPassword"
                        label="New Password"
                        type="password"
                        control={control}
                    />

                    <Controler
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        control={control}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        loading={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        Update Password
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default ChangePassword;
