import React, { useEffect } from "react";
import { Loader, FormattedDate } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { fetchBids } from "../../store/Auction/bidsSlice";

const BidHistory = ({ auctionId }) => {
    const dispatch = useDispatch();

    const { accessKey, status: authStatus, userData } = useSelector((state) => state.auth);
    const bidsData = useSelector((state) => state.bid.bids);

    const customer_id = authStatus ? userData.id : null;

    useEffect(() => {
        if (auctionId) {
            dispatch(fetchBids({ auctionId }));
        }
    }, [dispatch, auctionId]);

    const renderBidHistory = () => {
        return bidsData?.map((bid) => (
            <div
                className={`flex rounded-full ${customer_id === bid.bidder.id ? "bg-green-200" : "bg-sky-100"} px-2 py-1 items-center mb-2`}
                key={bid.id}
            >
                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center text-2xl justify-center">
                    {bid.bidder.first_name[0]}
                </div>
                <div className="block justify-center mt-auto mb-auto ml-2">
                    <h3 className="font-semibold">
                        {bid.bidder.id === customer_id ? bid.bidder.first_name : `${bid.bidder.first_name.slice(0, 2)}***${bid.bidder.first_name.slice(-1)}`}
                    </h3>
                    <span className="text-sm text-gray-400">
                        <FormattedDate date={bid.created_at} />
                    </span>
                </div>
                <div className="ml-auto mr-4">
                    <span className="text-[17px] font-bold">
                        Rs. {bid.amount}
                    </span>
                </div>
            </div>
        ));
    };

    return (
        <div className="lg:col-span-1 p-4 bg-gray-100">
            <h2 className="text-center font-semibold text-xl py-2 rounded-lg bg-white">
                Bidding History
            </h2>
            <div className="flex flex-col h-96 overflow-y-scroll rounded-lg mt-2 bg-white">
                <div className="flex flex-col bg-white w-full px-2 py-2">
                    {bidsData && renderBidHistory()}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BidHistory);
