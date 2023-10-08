create table payment(
    id varchar(32) primary key,
    user_email varchar(256) not null,
    amount float not null,
    payment_date date not null
);

