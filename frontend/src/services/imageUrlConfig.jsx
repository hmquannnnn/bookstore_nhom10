const baseURL = import.meta.env.VITE_BACKEND_URL;

const imageUrlConfig = (originalURL) => {
    try {
        return baseURL + "/image?id=" + originalURL.split('=').pop();
    } catch (error) {
        return "";
    }
}

export default imageUrlConfig;
