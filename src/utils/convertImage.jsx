import React from "react";

export default function ConvertImage(file) {

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = () => {
            console.error("FileReader error:", reader.error);
        };
        reader.onload = () => resolve(reader.result);
    });
}

