import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useContext } from "react";
import ProductCard from "./productCard";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../axios-api/useApi";
import { ProductContext } from "../../product-context/productContext";

function ProductList() {
    const navigate = useNavigate();
    const { product, setProduct, setPrev } = useContext(ProductContext);

    const addProduct = () => {
        setPrev(null); // clear edit state
        navigate("/dashboard/products/add");
    };

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            // console.log(response);

            setProduct(response);
        } catch (error) {
            console.log("failed to load the products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Delete this product?");
        if (!confirm) return;

        await deleteProduct(id);
        setProduct((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (product) => {
        setPrev(product);
        navigate(`/dashboard/products/edit/${product.id}`);
    };

    return (
        <>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3
                }}
            >
                <Button variant="contained" onClick={addProduct}>
                    Add Product
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3
                }}
            >
                <Grid
                    container
                    spacing={3}
                    justifyContent={{ xs: "center", md: "flex-start" }}
                >
                    {product?.map((item) => (
                        <Grid
                            item
                            key={item.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ display: "flex" }}
                        >
                            <ProductCard
                                product={item}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </>
    );
}

export default ProductList;


