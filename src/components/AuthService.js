import axios from "axios";
import { login } from "../store/authSlice";

export async function authenticateUser(accessToken, dispatch) {
    console.log(">>>>>>>>>>>>:: Inslide auth service");
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/auth/users/me/",
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
                    // accessKey: accessToken,
                    status: true,
                })
            );
        }
    } catch (error) {
        console.log("Error", error);
    }
}