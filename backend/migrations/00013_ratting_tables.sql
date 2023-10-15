create table ratting(
    user_email varchar(64) not null,
    book_id varchar(64) not null,
    ratting float not null,
    
    foreign key(user_email) references user(email),
    foreign key(book_id) references book(id)
);
