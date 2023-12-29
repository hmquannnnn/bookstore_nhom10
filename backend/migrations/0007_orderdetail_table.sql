create table orderDetail(
    order_id bigint unsigned not null,
    book_id varchar(64) not null,
    price_each float not null,
    quantity_ordered int not null,


    foreign key(order_id) references orders(id),
    foreign key(book_id) references book(id)
);


