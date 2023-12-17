-- Add migration script here

create procedure cart_order(in user_email varchar(256))
begin
	insert into orders(user_email, order_date, require_date) values (user_email, now(), adddate(now(), 3));
    select * from orders where orders.id = last_insert_id();
end
