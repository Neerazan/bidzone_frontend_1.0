import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axiosInstance from '../components/Product/AxiosInstance'

import { Container, ProductImages, ProductInfo, BidHistory } from '../components'

function Product() {
    const { slug } = useParams()

    const getAuctionDetails = async () => {
        try {
            const response = await axiosInstance.get(
                `/auction/auctions/${slug}`
            )
            return response.data
        } catch (error) {
            throw error
        }
    }


    const { data, isError, isLoading, error } = useQuery(
        "auctionDetails",
        getAuctionDetails
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading product details: {error.message}</div>
    }

    return (
        <Container>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <ProductImages data={data} />
                <ProductInfo data={data} />
                <BidHistory auctionId={data?.id} />
            </section>
        </Container>
    )
}

export default Product