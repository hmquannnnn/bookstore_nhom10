FROM rust:1.73.0


COPY . /app

WORKDIR /app/backend

CMD [ "cargo run" ]

