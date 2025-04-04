import React from 'react'; // Import React
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


// List of products
const products: { id: number; name: string; image: string; price: string }[] = [
    {
        id: 1,
        name: "Image 1",
        image: image1, // Use the imported image
        price: "$59.99",
    },
    {
        id:2,
        name:"Image 2",
        image:image2,
        price:"$0",
    },
    {
        id:3,
        name:"Image 3",
        image:image3,
        price:"$0",
    },
    {
      id:4,
      name:"Image 4",
      image:image4,
      price:"$0"  ,
    },
    {
        id:5,
        name:"Image 5",
        image:image5,
        price:"$0",
    },
    {
        id:6,
        name:"Image 6",
        image:image6,
        price:"$0",
    },
    {
        id:7,
        name:"Ïmage 7",
        image:image7,
        price:"$0"
    },
    {
        id:8,
        name:"Image 8",
        image:image8,
        price:"$0"
    },
    {
        id:9,
        name:"Image 9",
        image:image9,
        price:"$0"

    },
    {
        id:10,
        name:"Image 10",
        image:image10,
        price:"$0"
    },
    {
        id:11,
        name:"Image 11",
        image:image11,
        price:"$0"
    },
    {
        id:12,
        name:"Image 12",
        image:image12,
        price:"$0"
    }



];

// Main collection page component
const CollectionPage: React.FC = () => {
    return (
        <div>
            {/* Page Title */}
            <h1
                style={{
                    fontSize: "32px", // Font size
                    textAlign: "center", // Centered alignment
                }}
            >
                COLLECTION PAGE
            </h1>

            {/* Products Grid Container */}
            <div
                style={{
                    display: "flex", // Horizontal layout
                    justifyContent: "center", // Center items
                    gap: "20px", // Space between products
                    flexWrap: "wrap", // Allow wrapping to next line
                    marginTop: "20px", // Space above grid
                }}
            >
                {/* Iterate through products and render each */}
                {products.map((product) => (
                    <div
                        key={product.id} // Unique key for each product
                        style={{
                            border: "1px solid #ddd", // Border for the product
                            padding: "10px", // Inner spacing
                            textAlign: "center",// Center text
                            width: "30%", // Card width
                            boxSizing:"border-box",
                        }}
                    >
                        {/* Product Image */}
                        <img
                            src={product.image} // Image source
                            alt={product.name} // Alternative text for accessibility
                            style={{ width: "100%" }} // Full width
                        />

                        {/* Product Name */}
                        <h2
                            style={{
                                fontSize: "18px", // Font size
                                margin: "10px 0", // Vertical spacing
                            }}
                        >
                            {product.name}
                        </h2>

                        {/* Product Price */}
                        <p style={{ fontWeight: "bold" }}> {/* Bold to emphasize */}
                            {product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage; // Export the component for use