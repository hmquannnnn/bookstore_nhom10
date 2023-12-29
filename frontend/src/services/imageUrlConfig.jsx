const baseURL = import.meta.env.VITE_BACKEND_URL;

const imageUrlConfig = (originalURL) => {
    try {
        if (originalURL.includes('http://localhost:8080/api')) {
            console.log(originalURL);
            return originalURL.replace('http://localhost:8080/api', baseURL);
        }
        return originalURL;
    } catch (error) {
        return "";
    }
}

export default imageUrlConfig;
