import React, { useContext } from 'react'
import { Controller } from 'react-hook-form'
import ConvertImage from '../../utils/convertImage';
import { AuthContext } from '../../auth/context/auth-context';

function ImageController({ control, name, ...other }) {

    const { setPreview } = useContext(AuthContext);

    return (
        <Controller
            name={name}
            control={control}

            render={({ field }) => (
                <input
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const imageBase64 = await ConvertImage(file);
                        setPreview(imageBase64)
                        field.onChange(imageBase64)

                        // setValue("image", imageBase64);

                    }}

                    {...other}
                />
            )

            }


        />
    )
}

export default ImageController
