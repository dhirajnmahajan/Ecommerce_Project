import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
    Avatar,
    Grid
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { addProduct, updateProduct } from "../../axios-api/useApi";
import convertImage from "../../utils/convertImage";
import { Controler } from "../../components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductContext } from "../../product-context/productContext";


function AddProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { prev, setPrev, initialObj } = useContext(ProductContext);
    const [preview, setPreview] = useState(prev?.image || "");


    const productSchema = Yup.object().shape({
        pname: Yup.string().required("Product name is required!"),
        price: Yup.string().required("Price is required!"),
        description: Yup.string().required("Description is required!"),
        image: Yup.mixed().nullable()
    });

    const defaultValues = {
        pname: prev?.pname || "",
        price: prev?.price || "",
        description: prev?.description || "",
        image: prev?.image || null
    };

    // useEffect(() => {
    //     if (prev?.image) {
    //         setPreview(prev.image);
    //     }
    // }, [prev]);


    const methods = useForm({
        resolver: yupResolver(productSchema),
        defaultValues
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (prev?.id) {
                await updateProduct(prev.id, data);
                alert("Product updated");
                setPrev(initialObj);
            } else {
                await addProduct(data);
                alert("Product added");
            }

            navigate("/dashboard/products");
        } catch (error) {
            console.log("Product form error", error);
        }
    });

    const onBack = () => {
        navigate(-1)
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 2 }}>
            <Paper sx={{ p: 3 }}>
                <Grid container alignItems="center" mb={3} spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <ArrowBackIcon
                                sx={{ cursor: "pointer" }}
                                onClick={onBack}
                            />

                            <Typography variant="h4" mb={3} >
                                {id ? "Update Product" : "Add Product"}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>


                <form onSubmit={onSubmit}>
                    <Grid container mt={2} spacing={2}>

                        {/* LEFT SIDE – IMAGE */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Stack alignItems="center" spacing={2}>
                                <Avatar
                                    src={preview}
                                    variant="rounded"
                                    sx={{ width: 160, height: 160 }}
                                >
                                    {!preview && (
                                        <ImageIcon sx={{ fontSize: 80 }} />
                                    )}
                                </Avatar>

                                <Typography variant="caption">
                                    JPG, PNG, GIF allowed
                                </Typography>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const img = await convertImage(
                                                e.target.files[0]
                                            );
                                            setPreview(img);
                                            setValue("image", img);
                                        }}
                                    />
                                </Button>
                            </Stack>
                        </Grid>

                        {/* RIGHT SIDE – FORM */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <Controler
                                        name="pname"
                                        label="Product Name"
                                        control={control}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Controler
                                        name="price"
                                        label="Price"
                                        type="number"
                                        control={control}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Controler
                                        name="description"
                                        label="Description"
                                        control={control}
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                            </Grid>

                            {/* CENTERED BUTTON */}
                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    loading={isSubmitting}
                                    sx={{
                                        px: 5,
                                        minWidth: { xs: "100%", sm: 200 }
                                    }}
                                >
                                    {id ? "Update Product" : "Add Product"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>


    );
}

export default AddProduct;
