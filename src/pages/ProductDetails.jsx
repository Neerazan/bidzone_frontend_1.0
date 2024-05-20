import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchIndAuctions } from "../store/Auction/indAuctionSlice"
import {
    Container,
    ProductImages,
    ProductInfo,
    BidHistory,
    QnA,
    ProductDescription,
} from "../components"

function Product() {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const auctionDetails = useSelector((state) => state.indAuction.auction)

    useEffect(() => {
        if (slug) {
            dispatch(fetchIndAuctions({ slug }))
        }
    }, [dispatch, slug])

    if (!auctionDetails) {
        return <div>Loading...</div>
    }

    if (!auctionDetails.product) {
        return (
            <div>Error loading product details: Product data is missing.</div>
        )
    }

    return (
        <Container>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <ProductImages data={auctionDetails} />
                <ProductInfo data={auctionDetails} />
                <BidHistory auctionId={auctionDetails.id} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                <div className="col-span-4">
                    <div className="text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                        <ProductDescription data={auctionDetails} />
                    </div>

                    <div className="text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                        <QnA
                            auctionId={auctionDetails.id}
                            seller={auctionDetails.product.customer}
                        />
                    </div>
                </div>

                {/* Related Products */}
                <div className="text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md">
                    <div className="flex justify-center font-bold text-gray-600 py-4">
                        Related Products
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default Product
