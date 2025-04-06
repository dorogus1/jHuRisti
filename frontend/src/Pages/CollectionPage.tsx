import React, { useState, useRef, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import '../CssFiles/CollectionPage.css';
import PlayButton from '../Componente/PlayButton';
import { useSound } from '../Context/SoundContext';
import { CartButtonAdd } from "../Componente/CartButtonAdd";

interface Product {
    id: number;
    name: string;
    description: string;
    size: string;
    type: string;
    stock: number;
    youtubeId: string;
    price: number;
    isDefault: boolean;
    image: string | null;
}

// Product Popup Component
const ProductPopup = ({ product, onClose }: { product: Product, onClose: () => void }) => {
    return (
        <div className="product-popup-overlay" onClick={onClose}>
            <div className="product-popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onClose}>×</button>
                <div className="popup-image-container">
                    <img
                        src={`http://localhost:5274${product.image}`}
                        alt={product.name}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                    />
                </div>
                <div className="popup-details">
                    <h2>{product.name}</h2>
                    <p className="popup-price">${product.price.toFixed(2)}</p>
                    <p className="popup-description">{product.description}</p>
                    <div className="popup-metadata">
                        <span>Size: {product.size}</span>
                        <span>Type: {product.type}</span>
                        <span>Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</span>
                    </div>
                    {product.stock > 0 ? (
                        <CartButtonAdd
                            productId={product.id}
                            quantity={1}
                            productDetails={{
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                stock: product.stock,
                                size: product.size,
                                type: product.type
                            }}
                        />
                    ) : (
                        <button className="cart-button popup-cart-button" disabled>
                            𝐗
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CollectionPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioPlayerRef = useRef<HTMLIFrameElement | null>(null);
    const { setResetPlayStateCallback } = useSound();
    // State for selected product popup
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [lastRefreshTime, setLastRefreshTime] = useState(Date.now());
    const previousProductsRef = useRef<Product[]>([]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5274/api/product/products');
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data);
            setLastRefreshTime(Date.now());
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err instanceof Error ? err.message : 'Failed to load products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Set up periodic check for stock changes
    useEffect(() => {
        const checkForStockChanges = async () => {
            try {
                const response = await fetch('http://localhost:5274/api/product/products');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const newProducts = await response.json();

                // Check if any product has just gone out of stock
                const stockChangeToZero = newProducts.some((newProduct: Product) => {
                    const oldProduct = previousProductsRef.current.find(p => p.id === newProduct.id);
                    return oldProduct && oldProduct.stock > 0 && newProduct.stock === 0;
                });

                if (stockChangeToZero) {
                    // Refresh data if a product just went out of stock
                    setProducts(newProducts);
                    setLastRefreshTime(Date.now());
                }

                // Update the reference to compare in next check
                previousProductsRef.current = newProducts;
            } catch (error) {
                console.error("Error checking product stock:", error);
            }
        };

        // Update reference after initial load
        if (products.length > 0 && previousProductsRef.current.length === 0) {
            previousProductsRef.current = [...products];
        }

        // Set up periodic check every 30 seconds
        const intervalId = setInterval(checkForStockChanges, 30000);

        return () => clearInterval(intervalId);
    }, [products]);

    useEffect(() => {
        const resetPlayback = () => {
            setPlayingId(null);
            if (audioPlayerRef.current && audioPlayerRef.current.parentNode) {
                audioPlayerRef.current.parentNode.removeChild(audioPlayerRef.current);
                audioPlayerRef.current = null;
            }
        };
        setResetPlayStateCallback(resetPlayback);
        return () => {
            setResetPlayStateCallback(() => {});
        };
    }, [setResetPlayStateCallback]);

    const handlePlay = (youtubeId: string) => {
        if (playingId === youtubeId) {
            if (audioPlayerRef.current && audioPlayerRef.current.parentNode) {
                audioPlayerRef.current.parentNode.removeChild(audioPlayerRef.current);
                audioPlayerRef.current = null;
            }
            setPlayingId(null);
        } else {
            if (audioPlayerRef.current && audioPlayerRef.current.parentNode) {
                audioPlayerRef.current.parentNode.removeChild(audioPlayerRef.current);
            }
            const iframe = document.createElement('iframe');
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            iframe.style.position = 'absolute';
            iframe.style.top = '-9999px';
            iframe.style.left = '-9999px';
            iframe.allow = 'autoplay';
            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&showinfo=0&autohide=1`;
            document.body.appendChild(iframe);
            audioPlayerRef.current = iframe;
            setPlayingId(youtubeId);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchType = filters.type === "" || product.type === filters.type;
        const matchSize = filters.size === "" || product.size === filters.size;
        const matchStock = !filters.inStock || product.stock > 0;
        const matchPrice =
            filters.priceRange === "" ||
            (filters.priceRange === "0-50" && product.price <= 50) ||
            (filters.priceRange === "50-100" && product.price > 50 && product.price <= 100);
        return matchType && matchSize && matchStock && matchPrice;
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector('img') as HTMLImageElement;
        if (image) image.style.transform = "scale(1.1)";
        const text = e.currentTarget.querySelector('.product-title') as HTMLHeadingElement;
        if (text) text.style.transform = "translateY(+20px)";
        const price = e.currentTarget.querySelector('.product-price') as HTMLParagraphElement;
        if (price) price.style.transform = "translateY(+20px)";
        const playbutton = e.currentTarget.querySelector('.play-button') as HTMLButtonElement;
        if (playbutton) playbutton.style.transform = "translateY(+20px)";
        const cartButton = e.currentTarget.querySelector('.cart-button') as HTMLButtonElement;
        if (cartButton) cartButton.style.transform = "translateY(+20px)";
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const playBtn = e.currentTarget.querySelector('.play-btn') as HTMLButtonElement;
        if (playBtn) playBtn.style.opacity = "0";
        const image = e.currentTarget.querySelector('img') as HTMLImageElement;
        if (image) image.style.transform = "scale(1)";
        const text = e.currentTarget.querySelector('.product-title') as HTMLHeadingElement;
        if (text) text.style.transform = "translateY(-0px)";
        const price = e.currentTarget.querySelector('.product-price') as HTMLParagraphElement;
        if (price) price.style.transform = "translateY(-0px)";
        const playbutton = e.currentTarget.querySelector('.play-button') as HTMLButtonElement;
        if (playbutton) playbutton.style.transform = "translateY(+0px)";
        const cartButton = e.currentTarget.querySelector('.cart-button') as HTMLButtonElement;
        if (cartButton) cartButton.style.transform = "translateY(0px)";
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    // Handle product image click to open popup
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    // Handle closing the popup
    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    // Format the refresh time for display
    const formatRefreshTime = () => {
        const date = new Date(lastRefreshTime);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };

    // Handle keyboard events for accessibility (close popup with Escape key)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedProduct) {
                handleClosePopup();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedProduct]);

    if (loading) {
        return (
            <div className="collection-container">
                <Header showFilterButton={true} onFilterChange={handleFilterChange} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading products...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="collection-container">
                <Header showFilterButton={true} onFilterChange={handleFilterChange} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Error: {error}</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="collection-container">
            <Header showFilterButton={true} onFilterChange={handleFilterChange} />
            <div style={{ flex: 1 }}>
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    className="product-image-container"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <img
                                        src={`http://localhost:5274${product.image}`}
                                        alt={product.name}
                                        className={`product-image ${playingId === product.youtubeId ? 'playing' : ''}`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
                                        }}
                                    />
                                    {product.stock === 0 && (
                                        <div className="out-of-stock-overlay">
                                            <span className="out-of-stock-text">OUT OF STOCK</span>
                                        </div>
                                    )}
                                </div>
                                {product.stock > 0 ? (
                                    <CartButtonAdd
                                        productId={product.id}
                                        quantity={1}
                                        productDetails={{
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            stock: product.stock,
                                            size: product.size,
                                            type: product.type
                                        }}
                                    />
                                ) : (
                                    <button className="cart-button" disabled>
                                        𝐗
                                    </button>
                                )}
                                <PlayButton
                                    youtubeId={product.youtubeId}
                                    playingId={playingId}
                                    onPlay={handlePlay}
                                />
                                <h2 className="product-title">{product.name}</h2>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                            </div>
                        ))
                    ) : (
                        <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
                            <p>No products match your filters.</p>
                        </div>
                    )}
                </div>

                {products.some(product => product.stock === 0) && (
                    <div className="refresh-indicator">
                        <small>Monitoring stock status. Last updated: {formatRefreshTime()}</small>
                    </div>
                )}

                <Footer />
            </div>

            {/* Product popup */}
            {selectedProduct && (
                <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default CollectionPage;