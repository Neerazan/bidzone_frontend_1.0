import React from 'react'
import { ProductDetails, Container } from '../components'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axiosInstance from '../components/Product/AxiosInstance'

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
            <ProductDetails slug={slug}/>
        </Container>
    )
}

export default Product