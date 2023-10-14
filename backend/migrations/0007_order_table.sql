create table orders(
    id int auto_increment primary key,
    user_email varchar(256) not null,
    order_date date not null,
    require_date date,

    foreign key(user_email) references user(email)
);

create index idx_order_user_email on user(email);
