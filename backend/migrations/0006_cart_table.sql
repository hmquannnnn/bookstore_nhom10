create table cart(
    user_email varchar(256) not null,
    book_id varchar(32) not null,
    quantity_ordered int not null,


    foreign key(user_email) references user(email),
    foreign key(book_id) references book(id)
);

create index idx_cart_user on cart(user_email);
