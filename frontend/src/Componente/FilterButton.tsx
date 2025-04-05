import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../CssFiles/Componente.css';
import blackFilterButton from "../Pictures/BlackFilterButton.png";
import whiteFilterButton from "../Pictures/WhiteFilterButton.png";

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
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains('dark-mode'));
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

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
        <div className="filter-container">
            <button
                onClick={toggleDropdown}
                className="filter-button"
                style={{
                    backgroundImage: `url(${isDarkMode ? whiteFilterButton : blackFilterButton})`,
                    width: "50px",
                    height: "50px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    border: "none",
                    cursor: "pointer", 
                }}
            />
            {isDropdownVisible && (
                <div className="filter-dropdown">
                    <h3 className="filter-title">Filters</h3>

                    <label className="filter-label">Product Type</label>
                    <select
                        name="type"
                        onChange={handleChange}
                        value={filters.type}
                        className="filter-select"
                    >
                        <option value="">All</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>

                    <label className="filter-label">Size</label>
                    <select
                        name="size"
                        onChange={handleChange}
                        value={filters.size}
                        className="filter-select"
                    >
                        <option value="">All</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>

                    <label className="filter-label">Availability</label>
                    <h2 className="filter-checkbox-container">
                        <input
                            type="checkbox"
                            name="inStock"
                            onChange={handleChange}
                            checked={filters.inStock}
                            className="filter-checkbox"
                        />
                        <span>In Stock</span>
                    </h2>

                    <label className="filter-label">Price</label>
                    <select
                        name="priceRange"
                        onChange={handleChange}
                        value={filters.priceRange}
                        className="filter-select"
                    >
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