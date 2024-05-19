import React, { useEffect } from "react"
import {
    Container,
    Carousel,
    CollectionSider,
    ProductContainer,
} from "../components/index"
import { useSelector, useDispatch } from "react-redux"
import { fetchAuctions } from "../store/Auction/auctionSlice"

function Home() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.auction.auctions)
    const loading = useSelector((state) => state.auction.loading)

    useEffect(() => {
        dispatch(fetchAuctions())
    }, [dispatch])

    return (
        <Container>
            {loading && <p>Loading...</p>}
            {data && data.length > 0 && (
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <CollectionSider />
                        <Carousel />
                    </div>
                    <ProductContainer data={data} status="A" />
                    <ProductContainer data={data} status="S" />
                </div>
            )}
            {data && data.length === 0 && <p>No auctions available.</p>}
        </Container>
    )
}

export default Home
