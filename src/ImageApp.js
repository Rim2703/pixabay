import React, { useState } from 'react'

const API_KEY = '37649381-fc70f5435c7ff7d118f63149f';

const ImageApp = () => {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`)
            const data = await response.json()
            setImages(data.hits)
            console.log(data.hits)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleImageHover = (imageId, shouldShowTags) => {
        const updatedImages = images.map((image) => {
            if (image.id === imageId) {
                return {
                    ...image,
                    showTags: shouldShowTags
                };
            }
            return image;
        });
        setImages(updatedImages);
    };

    return (
        <div>
            <h1>Image Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for all images on Pixabay"
                />
                <button type="submit">Search</button>
            </form>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-container">
                        <img src={image.webformatURL} alt={image.tags}
                            onMouseEnter={() => handleImageHover(image.id, true)}
                            onMouseLeave={() => handleImageHover(image.id, false)}
                        />
                        {image.showTags && <p className="image-tags">{image.tags}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageApp