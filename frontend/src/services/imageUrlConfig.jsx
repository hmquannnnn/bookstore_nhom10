const imageUrlConfig = (originalURL) => {
    if (originalURL.includes('localhost:8080')) {
        return originalURL.replace('localhost:8080', 'fall2324w20g10.int3306.freeddns.org');
    }
    return originalURL;
}

export default imageUrlConfig;