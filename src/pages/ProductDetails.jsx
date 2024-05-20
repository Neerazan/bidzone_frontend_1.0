import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axiosInstance from '../components/Product/AxiosInstance'

import { Container, ProductImages, ProductInfo, BidHistory, QnA } from '../components'

function Product() {
    const { slug } = useParams()

    const getAuctionDetails = async () => {
        try {
            const response = await axiosInstance.get(`/auction/auctions/${slug}`)
            return response.data
        } catch (error) {
            throw error
        }
    }

    const { data: auctionDetails, isError: auctionError, isLoading: auctionLoading } = useQuery(
        "auctionDetails",
        getAuctionDetails
    )

    const { data: bids, isError: bidsError, isLoading: bidsLoading } = useQuery(
        ["auctionBids", auctionDetails?.id], // Include auctionDetails.id in the query key
        async () => {
            if (auctionDetails) {
                try {
                    const response = await axiosInstance.get(`/auction/auctions/${auctionDetails.id}/bids/`)
                    return response.data
                } catch (error) {
                    throw error
                }
            }
        },
        { enabled: !!auctionDetails } // Ensure the query is only enabled when auctionDetails is available
    )



    if (auctionLoading || bidsLoading) {
        return <div>Loading...</div>
    }

    if (auctionError) {
        return <div>Error loading product details: {auctionError.message}</div>
    }

    if (bidsError) {
        return <div>Error loading auction bids: {bidsError.message}</div>
    }
    

    return (
        <Container>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <ProductImages data={auctionDetails} />
                <ProductInfo data={auctionDetails} bidsData={bids}/>
                <BidHistory data={bids} isLoading={bidsLoading}/>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <QnA auctionId={auctionDetails.id} seller={auctionDetails.product.customer}/>
                <div className='flex justify-center mt-4'>Related Products</div>
            </section>
        </Container>
    )
}

export default Product