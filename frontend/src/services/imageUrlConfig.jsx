const baseURL = import.meta.env.VITE_BACKEND_URL;

const imageUrlConfig = (originalURL) => {
    if (originalURL == null) {
        return baseURL + "/image?id=" + originalURL.split('=').pop();
    }
    return "";
}

export default imageUrlConfig;
