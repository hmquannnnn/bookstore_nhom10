create table user (
    email varchar(256) primary key,
    name varchar(256) not null,
    phone varchar(15),
    password varchar(256) not null,
    address varchar(256) not null,
    role varchar(32) not null,

    image_url varchar(256)
);

create index idx_user_name on user(name);
create index idx_user_phone on user(phone);

