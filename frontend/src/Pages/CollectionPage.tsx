import React, { useState } from 'react';
import image1 from '../Img/5751a5302061c5b2860c113558fcbc09.jpg';
import image2 from '../Img/1c64075ae03627456e64840d1e6e279c.jpg';
import image3 from '../Img/75e22594c83a665309cf09bb4e121a60.jpg';
import image4 from '../Img/2ba3838c208138b6ca4a56b894501e41.jpg';
import image5 from '../Img/da4115c758b35f0702ee050ddf394189.jpg';
import image6 from '../Img/6766c96b1eaaa50de992a9ce5b24ee67.jpg';
import image7 from '../Img/dc75d2f04ec2279609d6256ccf4b1718.jpg';
import image8 from '../Img/00f89f1713238e5cc12a440fc764431a.jpg';
import image9 from '../Img/2afe38ade37de829b765f44b819831c6.jpg';
import image10 from '../Img/img.png';
import image11 from '../Img/img_1.png';
import image12 from '../Img/img_2.png';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";

const products = [
    { id: 1, name: "Sparkly Y2K blue vibes!", image: image1, price: "$59.99", priceValue: 59.99, type: "Women", size: "M", inStock: true },
    { id: 2, name: "Teaching in style with those heels", image: image2, price: "$30.00", priceValue: 30, type: "Women", size: "L", inStock: true },
    { id: 3, name: "Whoever said bandanas are out of trend clearly hasn't seen me", image: image3, price: "$45.00", priceValue: 45, type: "Women", size: "S", inStock: false },
    { id: 4, name: "Out of sight, out of mind", image: image4, price: "$70.00", priceValue: 70, type: "Women", size: "M", inStock: true },
    { id: 5, name: "Tokyo Drift", image: image5, price: "$35.00", priceValue: 35, type: "Women", size: "L", inStock: true },
    { id: 6, name: "Looking like a snack", image: image6, price: "$55.00", priceValue: 55, type: "pantaloni", size: "S", inStock: false },
    { id: 7, name: "Dressed like I just escaped from a fashion prison", image: image7, price: "$20.00", priceValue: 20, type: "Women", size: "M", inStock: true },
    { id: 8, name: "This outfit is brought to you by procrastination", image: image8, price: "$90.00", priceValue: 90, type: "Men", size: "L", inStock: true },
    { id: 9, name:"Feeling cute. Might delete later", image: image9, price: "$40.00", priceValue: 40, type: "Men", size: "S", inStock: false },
    { id: 10, name: "​Note to self: never take fashion advice from a potato", image: image10, price: "$100.00", priceValue: 100, type: "Men", size: "M", inStock: true },
    { id: 11, name: "Dressed like I have somewhere cooler to be", image: image11, price: "$25.00", priceValue: 25, type: "Men", size: "L", inStock: true },
    { id: 12, name: "Style so good, it's laughable", image: image12, price: "$15.00", priceValue: 15, type: "Men", size: "S", inStock: true },
];

const CollectionPage: React.FC = () => {
    const [filters, setFilters] = useState({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });

    const filteredProducts = products.filter((product) => {
        const matchType = filters.type === "" || product.type === filters.type;
        const matchSize = filters.size === "" || product.size === filters.size;
        const matchStock = !filters.inStock || product.inStock;
        const matchPrice =
            filters.priceRange === "" ||
            (filters.priceRange === "0-50" && product.priceValue <= 50) ||
            (filters.priceRange === "50-100" && product.priceValue > 50 && product.priceValue <= 100);

        return matchType && matchSize && matchStock && matchPrice;
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).style.transform = "scale(1.1)";
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).style.transform = "scale(1)";
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Header showFilterButton={true} onFilterChange={handleFilterChange} />
            <div style={{ flex: 1 }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "20px",
                }}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            textAlign: "center",
                            width: "30%",
                            boxSizing: "border-box",
                        }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                            <h2 style={{ fontSize: "18px", margin: "10px 0" }}>{product.name}</h2>
                            <p style={{ fontWeight: "bold" }}>{product.price}</p>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CollectionPage;