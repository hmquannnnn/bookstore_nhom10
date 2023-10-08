create table orderDetail(
    order_id int not null references orders(id),
    book_id varchar(32) references book(id),
    price_each float not null,
    quantity_ordered int not null
);


