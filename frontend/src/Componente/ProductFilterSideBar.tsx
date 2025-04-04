import React, { useState } from "react";

interface FilterSidebarProps {
    onFilterChange: (filters: Filters) => void;
}

interface Filters {
    type: string;
    size: string;
    inStock: boolean;
    priceRange: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<Filters>({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;
        const updatedValue = target.type === "checkbox" ? (target as HTMLInputElement).checked : value;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: updatedValue,
        }));

        onFilterChange({ ...filters, [name]: updatedValue });
    };

    return (
        <div style={{
            position: "sticky",
            top: "80px", // Distanța față de partea superioară
            alignSelf: "flex-start", // Asigură că bara laterală nu se extinde pe toată înălțimea
            padding: "20px",
            borderRight: "1px solid #ddd",
            width: "300px",
            height: "fit-content",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
            zIndex: "4"
        }}>
            <h3 style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}>Filtre</h3>

            {/* Tip Produs */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Tip Produs</label>
            <select name="type" onChange={handleChange} value={filters.type} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}>
                <option value="">Toate</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
            </select>

            {/* Mărime */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Mărime</label>
            <select name="size" onChange={handleChange} value={filters.size} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}>
                <option value="">Toate</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
            </select>

            {/* Disponibilitate */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Disponibilitate</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <input type="checkbox" name="inStock" onChange={handleChange} checked={filters.inStock} style={{ transform: "scale(1.2)" }} />
                <span>Doar în stoc</span>
            </div>

            {/* Preț */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Preț</label>
            <select name="priceRange" onChange={handleChange} value={filters.priceRange} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                <option value="">Toate</option>
                <option value="0-50">0 - 50$</option>
                <option value="50-100">50 - 100$</option>
            </select>
        </div>
    );
};

export default FilterSidebar;
