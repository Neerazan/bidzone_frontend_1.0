import React, { useState } from 'react';
import axios from 'axios';

const KhaltiPayment = () => {
    const [loading, setLoading] = useState(false);

    const pay = async () => {
        setLoading(true);
        try {

            const publicKey = "Nirajan_Public_Key";
            const privateKey = "Nirajan_Private_Key";

            const action = "checkout"; // or "tokenize"
            const amount = "1000"; // Amount in paisa
            const productName = "Your Product Name";
            const productImage = ""; // URL of the product image
            const description = "Product Description";
            const callbackUrl = "http://localhost:3000/callback"; 
            const ipnUrl = "http://localhost:5173/user/make_payment"; 

            const options = {
                "productInfo": [{
                    "name": productName,
                    "amount": amount,
                    "image": productImage,
                    "description": description
                }],
                "billingInfo": [{
                    "name": "Customer Name",
                    "email": "customer@example.com",
                    "phone": "1234567890"
                }],
                "orderInfo": {
                    "successUrl": callbackUrl,
                    "failUrl": "http://localhost:3000/fail",
                    "cancelUrl": "http://localhost:3000/cancel"
                },
                "additionalParameters": {
                    "action": action
                }
            };

            const response = await axios.post("https://khaltiapi.com/v2/payment/create", options, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${publicKey}:${privateKey}`).toString('base64')}`
                }
            });

            if (response.data.success) {
                window.location.href = response.data.order_url;
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={pay} disabled={loading}>Pay with Khalti</button>
        </div>
    );
};

export default KhaltiPayment;
