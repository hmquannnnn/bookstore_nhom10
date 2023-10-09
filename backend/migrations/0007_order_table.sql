create table orders(
    id int auto_increment primary key,
    user_email varchar(256) references user(email),
    order_date date not null,
    require_date date
);

create index idx_order_user_email on user(email);
