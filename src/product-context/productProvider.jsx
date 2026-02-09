import React, { useState } from "react";
import { ProductContext } from "./productContext";

function ProductProvider({ children }) {
    const initialObj = {
        pname: "",
        price: "",
        description: "",
        image: ""
    };

    const [prev, setPrev] = useState(null);
    const [product, setProduct] = useState([]);

    return (
        <ProductContext.Provider
            value={{ prev, setPrev, product, setProduct, initialObj }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
