create table orders(
    id bigint unsigned primary key,
    user_email varchar(256) not null,
    order_date varchar(256) not null,
    require_date varchar(256),
    status varchar(32),

    foreign key(user_email) references user(email)
);

create index idx_order_user_email on user(email);
