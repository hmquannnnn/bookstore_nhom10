create table cart(
    user_email varchar(256) not null,
    book_id varchar(64) not null,
    price_each float not null,
    quantity_ordered int not null,


    foreign key(user_email) references user(email),
    foreign key(book_id) references book(id),

    primary key(user_email, book_id)
);

create index idx_cart_user on cart(user_email);
