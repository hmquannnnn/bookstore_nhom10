-- Add migration script here
create table token (
    token varchar(256) primary key,
    user_email varchar(256) not null,
    issue_at datetime not null,
    expire_at datetime not null,


    foreign key(user_email) references user(email)
);