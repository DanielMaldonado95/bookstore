insert into authors(name) values('William Shakespeare'), ('Agatha Christie'), ('Barbara Cartland');
insert into genres(name) values ('Love'), ('tragedy'), ('Drama');
insert into books(name, date_premiered, author_id, genre_id) values ('Hamlet','1603-12-31', 1, 2), ('Macbeth', '1623-12-31', 1, 3), ('Romeo and Juliet','1597-12-31', 1, 1);
insert into inventary(book_id, price, quantity) values (1, 9.99, 5), (2, 14.99, 10), (3, 19.99, 20);