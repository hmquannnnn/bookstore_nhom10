#!/bin/bash

# Tải xuống và cài đặt Rustup
curl https://sh.rustup.rs -sSf | sh

# Chuyển đổi thư mục làm việc hiện tại sang thư mục frontend
npm install vite

# Chạy tác vụ build được định nghĩa trong tệp package.json của ứng dụng frontend
cd frontend

# Chạy tác vụ build được định nghĩa trong tệp package.json của ứng dụng frontend
npm run build

# Xóa tất cả các tệp trong thư mục dist của ứng dụng backend
rm -rf ../backend/dist

# Di chuyển các tệp kết quả của quá trình xây dựng ứng dụng frontend vào thư mục dist của ứng dụng backend
mv dist ../backend/dist
