create table book(
    id varchar(32) primary key,
    author_id int not null,
    title varchar(256) not null,
    price float not null,
    publish_year date not null,

    front_page_url varchar(256),
    back_page_url varchar(256),

    foreign key(author_id) references author(id)
);
