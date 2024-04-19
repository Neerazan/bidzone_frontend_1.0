import React from 'react'
import { ProductCard, Container, Carousel } from '../components/index'
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

    if (isLoading){
        console.log("Loading...");
    }

    if (isError){
        console.log("error");
        
    }


    if (data){
        console.log(data);
        
    }

    return (
        <Container>
            <Carousel />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {data?.map((auction) => (
                    <ProductCard
                        key={auction.id}
                        id={auction.id}
                        title={auction.product.title}
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
        </Container>
    )
}

export default Home