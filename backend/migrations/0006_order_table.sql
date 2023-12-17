create table orders(
    id varchar(64) primary key,
    user_email varchar(256) not null,
    order_date varchar(256) not null,
    require_date varchar(256),

    foreign key(user_email) references user(email)
);

create index idx_order_user_email on user(email);
