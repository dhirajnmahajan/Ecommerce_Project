import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function Controler({ control, name, label, type, ...other }) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        name={name}
                        label={label}
                        error={error}
                        type={type}
                        variant="outlined"
                        helperText={error && error?.message}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...other}
                    />
                )}
            >

            </Controller>
        </>
    )
}