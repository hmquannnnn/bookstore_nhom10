create table admin(
    email varchar(256) primary key,
    name varchar(256) not null,
    phone varchar(15) not null unique,
    password varchar(256) not null
);

create index idx_admin_name on admin(name);
create index idx_admin_phone on admin(phone);

