create table book_genre(
    book_id varchar(64) not null,
    genre_id int not null,
    
    foreign key(book_id) references book(id),
    foreign key(genre_id) references genre(id),

    primary key(book_id, genre_id)
);

create index idx_genre_of_book on book_genre(book_id);
create index idx_book_genre on  book_genre(genre_id);

