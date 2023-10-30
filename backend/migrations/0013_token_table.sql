-- Add migration script here
create table token (
    token varchar(32) primary key,
    user_email varchar(256) not null,
    issue_at date not null,
    expire_at date not null,


    foreign key(user_email) references user(email)
);