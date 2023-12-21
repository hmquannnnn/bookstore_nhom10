-- Add migration script here
alter table book
add fulltext book_index(title)
