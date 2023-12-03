-- Add migration script here
create procedure book_genres()
begin
	select book_id id, concat('[',group_concat(genre_id),']') genres 
	from book_genre
	group by id;
end
