-- Add migration script here
create table token (
    token varchar(32) primary key,
    user_email varchar(256) not null,
    login_time varchar(256) not null,

    foreign key(user_email) references user(email)
);