import React, { useState, useRef } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState<File | null>(null);
    const [productStock, setProductStock] = useState("");
    const [productYoutubeId, setProductYoutubeId] = useState("");
    const [productType, setType] = useState("");
    const [productSize, setSize] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageChange(e.dataTransfer.files[0]);
        }
    };

    const handleImageChange = (file: File) => {
        setProductImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("Name", productName);
            formData.append("Price", productPrice);
            if (productImage) {
                formData.append("Image", productImage);
            }
            formData.append("Stock", productStock);
            formData.append("YoutubeId", productYoutubeId);  // This matches the ProductViewModel property
            formData.append("Type", productType);
            formData.append("Size", productSize);

            // For debugging, log the form data
            console.log("Sending form data:", {
                name: productName,
                price: productPrice,
                stock: productStock,
                youtubeId: productYoutubeId,
                type: productType,
                size: productSize,
                hasImage: !!productImage
            });

            const response = await fetch("http://localhost:5274/api/product/add-product", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Server responded with ${response.status}: ${errorText}`);
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            alert("Product added successfully!");
            navigate('/collection');
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <div style={{ flex: 1, padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Product</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Price:</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Stock:</label>
                    <input
                        type="number"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>YouTube ID:</label>
                    <input
                        type="text"
                        value={productYoutubeId}
                        onChange={(e) => setProductYoutubeId(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Type:</label>
                    <select
                        value={productType}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                        <option value="">Select Type</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Size:</label>
                    <select
                        value={productSize}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Image:</label>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            border: `2px dashed ${isDragging ? '#007bff' : '#ccc'}`,
                            borderRadius: "4px",
                            padding: "40px 20px",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: isDragging ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                            transition: "all 0.3s"
                        }}
                    >
                        {imagePreview ? (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                    style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "10px" }}
                                />
                                <p>Click or drag to change image</p>
                            </div>
                        ) : (
                            <p>Drop image here or click to select file</p>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                handleImageChange(e.target.files[0]);
                            }
                        }}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                        width: "100%"
                    }}
                >
                    Add Product
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default AddProduct;