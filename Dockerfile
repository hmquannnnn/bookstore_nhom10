FROM rust:1.73.0


COPY ./backend /app

WORKDIR /app

CMD [ "cargo", "run" ]

EXPOSE 8000

