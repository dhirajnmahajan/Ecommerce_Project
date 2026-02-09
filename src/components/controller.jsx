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
                        variant="outlined"
                        fullWidth
                        name={name}
                        label={label}
                        error={error}
                        type={type}
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


/*
import {Controller} from 'react-hook-form'
import {TextField} from '@mui/material

func controler = ({name,label,type,control,..other})=> {
  return(
        <>
        <Controller
            name={name}
            control={control}
            render={ ({field, fieldState:{error}})=> (
                
                <TextField {...field} />
                
                )}
            >


    field = value , onChange , onBlur , name, ref
            </ Controller>
        </>
 
 )

 }

*/
