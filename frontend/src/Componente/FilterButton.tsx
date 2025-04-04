import React, { useState } from "react";

export interface Filters {
    type: string;
    size: string;
    inStock: boolean;
    priceRange: string;
}

interface FilterButtonProps {
    onFilterChange: (filters: Filters) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<Filters>({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;
        const updatedValue = target.type === "checkbox" ? (target as HTMLInputElement).checked : value;

        const newFilters = { ...filters, [name]: updatedValue };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div style={{ position: "relative" }}>
            <button onClick={toggleDropdown}
                    style={{
                        padding: "10px",
                        position: "absolute",
                        top: "-35px",
                        left: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        zIndex: "20"
                    }}>
                Filter
            </button>
            {isDropdownVisible && (
                <div style={{
                    position: "absolute",
                    top: "50px",
                    left: "10px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    width: "300px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: "20"
                }}>
                    <h3 style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "20px",
                        marginTop: "0px",
                        color: "#333"
                    }}>
                        Filters
                    </h3>

                    {/* Product Type */}
                    <label style={{
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left"
                    }}>
                        Product Type
                    </label>
                    <select name="type" onChange={handleChange} value={filters.type} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}>
                        <option value="">All</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>

                    {/* Size */}
                    <label style={{
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left"
                    }}>
                        Size
                    </label>
                    <select name="size" onChange={handleChange} value={filters.size} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}>
                        <option value="">All</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>

                    {/* Availability */}
                    <label style={{
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left"
                    }}>
                        Availability
                    </label>
                    <h2 style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        marginBottom: "10px"

                    }}>
                        <input type="checkbox" name="inStock" onChange={handleChange} checked={filters.inStock} style={{ transform: "scale(1.2)" }} />
                        <span>In Stock</span>
                    </h2>

                    {/* Price */}
                    <label style={{
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left"
                    }}>
                        Price
                    </label>
                    <select name="priceRange" onChange={handleChange} value={filters.priceRange} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                        <option value="">All</option>
                        <option value="0-50">0 - 50$</option>
                        <option value="50-100">50 - 100$</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default FilterButton;