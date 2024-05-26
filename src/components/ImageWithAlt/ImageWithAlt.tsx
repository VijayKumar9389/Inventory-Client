import React, { useState, useEffect } from 'react';
import { FaBox } from 'react-icons/fa6';

const ImageWithFallback: React.FC<{ imageName: string | null }> = ({ imageName }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if(!imageName) return;

        const fetchImageUrl = async () => {
            try {
                const response = await fetch(`http://localhost:4005/api/images/${imageName}`);
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.url);
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };


        fetchImageUrl();

        // Cleanup function
        return () => {
            setImageUrl(null); // Reset image URL on component unmount
        };
    }, [imageName]);

    if (!imageUrl) {
        return <div className="placeholder-image"><FaBox /></div>;
    }

    return <img src={imageUrl} crossOrigin="anonymous" alt="Image" />;
};

export default ImageWithFallback;
