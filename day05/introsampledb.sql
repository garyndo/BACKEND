-- cara buat database
create database toko;
-- hapus database 
drop database toko;
-- menggunakan database yg ingin  kita gunakan
use latihan;
-- memilih table yg inigin  kita tampilkan
select * from user;
-- insert data to table cara pertama
insert into user value(2, 'budi', 'budidoremi', 'doremi@gmail.com');
-- inser data to table cara kedua 
insert into user (username, password, email)values('dino','dino1!','din0@hotmail.com');
-- insert data to table cara ketiga
insert into user set username='rafi', password='rafi1!', email='rafi@gmail.com';

insert into user values 
(null, 'kevin', 'kevin1!','kevin@gmail'),
(null, 'dede', 'deed1!','dede@gmail');

-- update semua isi kolom
update user set password = 'frengky1!';
-- update by isi kolom by id
update user set password = 'frengky1!',username='frengky',email='frenfky@yahoo.com' where id_user=2;

-- delete data user
delete from user where id_user=6;
