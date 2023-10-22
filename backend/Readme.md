1. install docker 

2. tạo docker image
docker build -t backend:run .

dùng "docker image ls" để xem các image đang có, rồi lấy id của image vừa tạo.

3. chạy docker
 docker run --network=host Image_id




