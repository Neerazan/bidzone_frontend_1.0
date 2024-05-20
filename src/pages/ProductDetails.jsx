import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIndAuctions } from '../store/Auction/indAuctionSlice';
import { Container, ProductImages, ProductInfo, BidHistory, QnA } from '../components';

function Product() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const auctionDetails = useSelector((state) => state.indAuction.auction);

    useEffect(() => {
        if (slug) {
            dispatch(fetchIndAuctions({ slug }));
        }
    }, [dispatch, slug]);

    if (!auctionDetails) {
        return <div>Loading...</div>;
    }

    if (!auctionDetails.product) {
        return <div>Error loading product details: Product data is missing.</div>;
    }

    return (
        <Container>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <ProductImages data={auctionDetails} />
                <ProductInfo data={auctionDetails} />
                <BidHistory auctionId={auctionDetails.id} />
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
                <QnA auctionId={auctionDetails.id} seller={auctionDetails.product.customer} />
                <div className='flex justify-center mt-4'>Related Products</div>
            </section>
        </Container>
    );
}

export default Product;
