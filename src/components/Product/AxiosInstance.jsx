import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorData = error.response?.data || {}
        const status = error.response?.status || 500
        console.error(
            "Interceptor error:",
            errorData.errorMsg || "An error occurred"
        )
        return Promise.reject({
            status,
            message: errorData.errorMsg || "An error occurred",
            detailedMessage:
                errorData.detailedMsg || "No detailed message provided",
        })
    }
)

export default axiosInstance
