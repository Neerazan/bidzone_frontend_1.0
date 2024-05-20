import React from 'react'
import parse from 'html-react-parser';

function ProductDescription({ data }) {

    const returnDescription = (description) => {
        if (description) {
            return parse(description)
        } else {
            return <p>No description available</p>
        }
    }

    return (
        <div className="pb-4">
            <div className="bg-white h-auto w-auto flex flex-col md:flex-row items-center rounded-md mt-4 px-8 mb-4">
                {data?.product?.description && (
                    <div className="w-full flex flex-col">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 mx-auto">Product Description of {data.product.title}</h2>
                        <p className='text-start'>
                            {returnDescription(data.product.description)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDescription