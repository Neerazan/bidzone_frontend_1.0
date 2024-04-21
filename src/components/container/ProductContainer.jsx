import React from 'react'
import { ProductCard } from '../index'

function ProductContainer({ data, status }) {
    const filteredData = data?.filter(auction => auction.auction_status === status)

    if (!filteredData || filteredData.length === 0) {
        // console.log("No data found in the filteredData array.");
        return null;
    }

    return (
        <>
            {status === 'A' ? <h1 className="text-2xl font-semibold mt-5">Active Products</h1> : 
            <h1 className="text-2xl font-semibold mt-5">Upcoming Products</h1>}
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredData.map((auction) => (
                    <ProductCard
                        key={auction.id}
                        id={auction.id}
                        title={auction.product.title}
                        slug={auction.product.slug}
                        description={auction.product.description}
                        price={auction.product.price}
                        image={auction.product.images[0].image}
                        currentPrice={auction.current_price}
                        bidsCount={auction.bids_count}
                        endingTime={auction.ending_time}
                        auctionStatus={auction.auction_status}
                    />
                ))}
            </div>
        </>
    )
}

export default ProductContainer
