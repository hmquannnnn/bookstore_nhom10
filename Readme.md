1. Install cargo, vite

<[cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)>

npm install vite

2. Build frontend

cd frontend

npm run build

3. Move build to backend

rm -rf ../backend/dist

mv dist ../backend/dist

4. Build and run backend

Edit .env file

cargo run -r





