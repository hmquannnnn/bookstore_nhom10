create table book_genre(
    book_id varchar(64) not null,
    genre_name varchar(256) not null,
    
    foreign key(book_id) references book(id),
    foreign key(genre_name) references genre(name)
);

create index idx_genre_of_book on book_genre(book_id);
create index idx_book_genre on  book_genre(genre_name);

