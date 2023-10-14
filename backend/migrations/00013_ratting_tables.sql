create table ratting(
    user_email varchar(32) not null,
    book_id varchar(32) not null,
    ratting float not null,
    description text,
    
    foreign key(user_email) references user(email),
    foreign key(book_id) references book(id)
);
