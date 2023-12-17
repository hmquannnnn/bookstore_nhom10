create table payment(
    id varchar(64) primary key,
    order_id varchar(64) not null,
    user_email varchar(256) not null,
    amount float not null,
    payment_date varchar(256) not null,
    

    foreign key(user_email) references user(email),
    foreign key(order_id) references orders(id)
);

