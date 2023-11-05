create table book(
    id varchar(64) primary key,
    author_id int not null,
    title varchar(256) not null,
    price float not null,
    publish_year varchar(256) not null,
    number_of_purchases int,
    book_in_stocks int not null,
    rating float,
    desciption text,

    front_page_url varchar(256),
    back_page_url varchar(256),

    foreign key(author_id) references author(id)
);
