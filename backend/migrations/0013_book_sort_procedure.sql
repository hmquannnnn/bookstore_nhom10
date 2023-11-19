-- Add migration script here
create procedure book_sort(in _length int, in _start int, in _column varchar(32), in _order varchar(32))
begin
	set @q = concat(
    'select * from book order by ', 
    _column, ' ', _order,
    ' limit ', _length, 
    ' offset ', _start);
    prepare books from @q;
    execute books;
	select book.*, author.name as author_name from books
	join author
where author.id = book.author_id;
end