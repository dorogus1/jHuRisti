import React, { useState, useRef, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import '../CssFiles/CollectionPage.css';
import PlayButton from '../Componente/PlayButton';

// Define product interface based on Storage.cs model
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

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5274/api/product/products');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err instanceof Error ? err.message : 'Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePlay = (youtubeId: string) => {
        if (playingId === youtubeId) {
            // If clicking the same product, stop playing
            if (audioPlayerRef.current && audioPlayerRef.current.parentNode) {
                audioPlayerRef.current.parentNode.removeChild(audioPlayerRef.current);
                audioPlayerRef.current = null;
            }
            setPlayingId(null);
        } else {
            // If clicking a different product or nothing was playing
            // First, remove any existing players
            if (audioPlayerRef.current && audioPlayerRef.current.parentNode) {
                audioPlayerRef.current.parentNode.removeChild(audioPlayerRef.current);
            }

            // Create hidden iframe for audio
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
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

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
                                <img
                                    src={`http://localhost:5274${product.image}`}
                                    alt={product.name}
                                    className={`product-image ${playingId === product.youtubeId ? 'playing' : ''}`}
                                    onError={(e) => {
                                        // Fallback image if the product image fails to load
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
                                    }}
                                />
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
                <Footer />
            </div>
        </div>
    );
};

export default CollectionPage;