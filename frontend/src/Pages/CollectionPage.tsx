import React, { useState, useRef } from 'react';
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
import '../CssFiles/CollectionPage.css';
import PlayButton from '../Componente/PlayButton';

const products = [
    { id: 1, name: "Sparkly Y2K blue vibes!", image: image1, price: "$59.99", priceValue: 59.99, type: "Women", size: "M", inStock: true, youtubeId: "--AHUQRWoqw" },
    { id: 2, name: "Teaching in style with those heels", image: image2, price: "$30.00", priceValue: 30, type: "Women", size: "L", inStock: true, youtubeId: "tzpLZyFVJv4" },
    { id: 3, name: "Whoever said bandanas are out of trend clearly hasn't seen me", image: image3, price: "$45.00", priceValue: 45, type: "Women", size: "S", inStock: false, youtubeId: "LsoLEjrDogU" },
    { id: 4, name: "Out of sight, out of mind", image: image4, price: "$70.00", priceValue: 70, type: "Women", size: "M", inStock: true, youtubeId: "UxxajLWwzqY" },
    { id: 5, name: "Tokyo Drift", image: image5, price: "$35.00", priceValue: 35, type: "Women", size: "L", inStock: true, youtubeId: "IU9GmY70K7A" },
    { id: 6, name: "Looking like a snack", image: image6, price: "$55.00", priceValue: 55, type: "pantaloni", size: "S", inStock: false, youtubeId: "cgxLk2T0X-g" },
    { id: 7, name: "Dressed like I just escaped from a fashion prison", image: image7, price: "$20.00", priceValue: 20, type: "Women", size: "M", inStock: true, youtubeId: "0KSOMA3QBU0" },
    { id: 8, name: "This outfit is brought to you by procrastination", image: image8, price: "$90.00", priceValue: 90, type: "Men", size: "L", inStock: true, youtubeId: "2vjPBrBU-TM" },
    { id: 9, name:"Feeling cute. Might delete later", image: image9, price: "$40.00", priceValue: 40, type: "Men", size: "S", inStock: false, youtubeId: "gCYcHz2k5x0" },
    { id: 10, name: "Note to self: never take fashion advice from a potato", image: image10, price: "$100.00", priceValue: 100, type: "Men", size: "M", inStock: true, youtubeId: "tgbNymZ7vqY" },
    { id: 11, name: "Dressed like I have somewhere cooler to be", image: image11, price: "$25.00", priceValue: 25, type: "Men", size: "L", inStock: true, youtubeId: "hTWKbfoikeg" },
    { id: 12, name: "Style so good, it's laughable", image: image12, price: "$15.00", priceValue: 15, type: "Men", size: "S", inStock: true, youtubeId: "YJVmu6yttiw" },
];

const CollectionPage: React.FC = () => {
    const [filters, setFilters] = useState({
        type: "",
        size: "",
        inStock: false,
        priceRange: "",
    });

    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioPlayerRef = useRef<HTMLIFrameElement | null>(null);

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
        const matchStock = !filters.inStock || product.inStock;
        const matchPrice =
            filters.priceRange === "" ||
            (filters.priceRange === "0-50" && product.priceValue <= 50) ||
            (filters.priceRange === "50-100" && product.priceValue > 50 && product.priceValue <= 100);

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

    return (
        <div className="collection-container" >
            <Header showFilterButton={true} onFilterChange={handleFilterChange} />
            <div style={{ flex: 1 }}>
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className={`product-image ${playingId === product.youtubeId ? 'playing' : ''}`}
                            />
                            <PlayButton
                                youtubeId={product.youtubeId}
                                playingId={playingId}
                                onPlay={handlePlay}
                            />
                            <h2 className="product-title">{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CollectionPage;