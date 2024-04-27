import React from "react"
import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

function ProductImages({data}) {

    const [selectedImage, setSelectedImage] = useState(
        `http://127.0.0.1:8000/default-image.jpg` // Default image or loading state
    )

    useEffect(() => {
        if (data?.product?.images?.[0]?.image) {
            setSelectedImage(
                `http://127.0.0.1:8000${data.product.images[0].image}`
            )
        }
    }, [data])

    return (
        <div className="lg:col-span-1 relative">
            {/* Main Image */}
            <div className="mx-3 mt-3 flex overflow-hidden rounded-xl h-96">
                <LazyLoadImage
                    alt="image"
                    className="object-cover mx-auto"
                    src={selectedImage}
                />
            </div>
            <hr className="mt-2" />
            {/* Small Images Section */}
            <div className="w-full flex justify-center bg-white p-2">
                {data?.product?.images?.map((image) => (
                    <LazyLoadImage
                        key={image.id}
                        alt={`image`}
                        className="w-16 h-16 object-cover object-center rounded border border-gray-400 cursor-pointer mx-1"
                        src={`http://127.0.0.1:8000${image.image}`}
                        onMouseEnter={() =>
                            setSelectedImage(
                                `http://127.0.0.1:8000${image.image}`
                            )
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductImages
