import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${ process.env.API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = token;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        // Logging to the console for debug purposes only. TODO : remove this
        console.log(response);
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            // window.location.reload();
        } else if (response.status === 404) {
            //Show not found
        }

        throw error;
    }
);

export default axiosClient;
