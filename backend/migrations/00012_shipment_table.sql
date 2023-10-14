create table shipment(
    id int primary key auto_increment,
    order_id int not null,
    ship_price float not null,
    shipdate date not null,
    user_email varchar(256) not null,

    foreign key(order_id) references orders(id),
    foreign key(user_email) references user(email) 
)
