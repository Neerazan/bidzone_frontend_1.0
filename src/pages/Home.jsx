import React from 'react'
import { Container, Carousel, CollectionSider, ProductContainer } from '../components/index'
import { useQuery } from 'react-query'
import axios from 'axios'

const getAuctions = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/auction/auctions')
        return response.data
    } catch (error) {
        throw error
    }
}

function Home() {

    const { data, isError, isLoading } = useQuery('auctions', getAuctions)

    // if (isLoading){
    //     console.log("Loading...");
    // }

    if (isError){
        console.log("error");
    }

    return (
        <Container>
            <div className='grid grid-cols-5 gap-4'>
                <CollectionSider />
                <Carousel />
            </div>
            <ProductContainer data={data} status='A' />
            <ProductContainer data={data} status='S' />
        </Container>
    )
}

export default Home