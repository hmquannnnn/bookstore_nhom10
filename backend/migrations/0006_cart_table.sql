create table cart(
    user_email varchar(256) not null references user(email),
    book_id varchar(32) not null references book(id), 
    quantity_ordered int not null
);

create index idx_cart_user on cart(user_email);
