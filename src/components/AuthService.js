import axios from "axios";
import { login } from "../store/authSlice";

export async function authenticateUser(accessToken, dispatch) {
    try {
        console.log("Inside authenticateUser function");
        const response = await axios.get(
            "http://127.0.0.1:8000/auction/customers/me/",
            {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                },
            }
        );

        if (response.data) {
            dispatch(
                login({
                    userData: response.data,
                    accessKey: accessToken,
                    status: true,
                })
            );
        }
    } catch (error) {
        console.log("Error", error);
    }
}