-- Add migration script here
create procedure book_sort_desc(in _length int, in _start int, in _column varchar(32))
begin
	select book.*, author.name as author_name from (
		select * from book
		order by _column desc 
		limit _length offset _start
    ) book
	join author
where author.id = book.author_id;
end