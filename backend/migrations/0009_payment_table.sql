create table payment(
    id varchar(32) primary key,
    order_id int not null,
    user_email varchar(256) not null,
    amount float not null,
    payment_date date not null,
    

    foreign key(user_email) references user(email),
    foreign key(order_id) references orders(id)
);

