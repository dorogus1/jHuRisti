import React, { useState, useRef, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import '../CssFiles/CollectionPage.css';
import PlayButton from '../Componente/PlayButton';
import { useSound } from "../Context/SoundContext";

// Fallback images for testing or when API fails
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
import image13 from '../Img/img_3.png';
import image14 from '../Img/img_4.png';
import image15 from '../Img/img_5.png';

// Define product interface based on Storage.cs model
interface Product {
    id: number;
    name: string;
    description?: string;
    size: string;
    type: string;
    stock: number;
    youtubeId: string;
    price: number;
    isDefault: boolean;
    image: string | null;
}

// Fallback product data if API fails
const fallbackProducts = [
    { id: 1, name: "Sparkly Y2K blue vibes!", image: image1, price: 59.99, type: "Women", size: "M", stock: 1, youtubeId: "--AHUQRWoqw", isDefault: false },
    { id: 2, name: "Teaching in style with those heels", image: image2, price: 30, type: "Women", size: "L", stock: 1, youtubeId: "tzpLZyFVJv4", isDefault: false },
    // Additional fallback products...
];

const CollectionPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const [filters, setFilters] = useState({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        size: "M",
        type: "Women",
        stock: 1,
        youtubeId: "",
        price: 0,
        image: null as File | null
    });

    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioPlayerRef = useRef<HTMLIFrameElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch products when component mounts
    // Add this near the other useEffect hooks
    const { isMuted } = useSound();

    useEffect(() => {
        if (audioPlayerRef.current && audioPlayerRef.current.contentWindow) {
            const command = isMuted ? 'mute' : 'unMute';
            audioPlayerRef.current.contentWindow.postMessage(
                `{"event":"command","func":"${command}","args":""}`,
                '*'
            );
        }
    }, [isMuted]);

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
            // Use fallback products if fetch fails
            setProducts(fallbackProducts);
            setError(err instanceof Error ? err.message : 'Failed to load products from API, using fallback data');
            setLoading(false);
        }
    };

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

            // Add enablejsapi=1 to allow JavaScript control
            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&showinfo=0&autohide=1&enablejsapi=1`;

            document.body.appendChild(iframe);
            audioPlayerRef.current = iframe;
            setPlayingId(youtubeId);

            // Add event listener for iframe load
            iframe.onload = () => {
                if (iframe.contentWindow && isMuted) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                }
            };
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                image: e.target.files ? e.target.files[0] : null
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();

            // Append all form fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('size', formData.size);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('stock', formData.stock.toString());
            formDataToSend.append('youtubeId', formData.youtubeId);
            formDataToSend.append('price', formData.price.toString());
            formDataToSend.append('isDefault', 'false');
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch('http://localhost:5274/api/product/add', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Reset form and refresh products
            setFormData({
                name: "",
                description: "",
                size: "M",
                type: "Women",
                stock: 1,
                youtubeId: "",
                price: 0,
                image: null
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Refresh product list
            fetchProducts();

            // Hide form after successful submission
            setShowAddForm(false);
        } catch (err) {
            console.error('Error adding product:', err);
            alert('Failed to add product. Please try again.');
        }
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

    return (
        <div className="collection-container">
            <Header showFilterButton={true} onFilterChange={handleFilterChange} />
            <div style={{ flex: 1 }}>
                {error && (
                    <div style={{ padding: '10px', background: '#fff3cd', color: '#856404', margin: '10px 0', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {showAddForm ? 'Hide Form' : 'Add Product'}
                    </button>
                </div>

                {showAddForm && (
                    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="type">Type:</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                >
                                    <option value="Women">Women</option>
                                    <option value="Men">Men</option>
                                    <option value="pantaloni">Pantaloni</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="size">Size:</label>
                                <select
                                    id="size"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                >
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="stock">Stock:</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="youtubeId">YouTube ID:</label>
                                <input
                                    type="text"
                                    id="youtubeId"
                                    name="youtubeId"
                                    value={formData.youtubeId}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    accept="image/*"
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '15px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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
                                    src={product.image?.startsWith('http') ? product.image :
                                        product.image?.startsWith('/') ? `http://localhost:5274${product.image}` :
                                            typeof product.image === 'string' ? product.image :
                                                'https://via.placeholder.com/300x400?text=No+Image'}
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