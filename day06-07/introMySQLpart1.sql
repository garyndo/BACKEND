-- FILTERING DATA DAY 06
select * from customers;

-- nampilin kolom sesiuai kebutuhn kita
select customerNumber,customerName,creditLimit from customers;

-- ORDER DATA, mngurutkan data yg  kita inginkan 
-- ascending
select customerNumber,customerName, creditLimit from customers order by customerName;
-- descending
select customerNumber,customerName, creditLimit from customers order by customerName desc;

-- where = filtering with condition
select customerNumber,customerName, creditLimit, country from customers where country = 'usa';
select customerNumber,customerName, creditLimit, country from customers where city = 'Singapore';
select customerNumber,customerName, creditLimit, city from customers where city = 'San Francisco';

-- bisa gabung beberapa filtering data
select customerNumber,customerName, creditLimit, country from customers where country = 'usa'order by customerName;

-- where + and
select customerNumber,customerName, country, salesRepEmployeeNumber from customers where country = 'USA' and salesRepEmployeeNumber=1166;
select * from products;
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars' and productScale= '1:18';
-- where + or
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars' or productScale= '1:18';

-- where + beetween
select * from employees where officeCode between 1 and 3; -- munculin semua data employee yg pny aofficecodenya 1 smpe 3
select * from products;
select * from products where buyPrice between 0 and 50.00; 
select * from products where buyPrice between 0 and 50.00 order by buyPrice; 

-- where + in, filter yg 1 kolom ada dua datanya 
select customerNumber,customerName, creditLimit, country from customers where country in ('USA', 'France');
select productCode, productName, productLine from products where productLine in ('Vintage Cars', 'Classic Cars');

-- where + like, mencarai tag search 
select * from employees where lastName like 'Bon%' ; -- cari data d karyawan yg lastnamenya punya huur B, depan
select * from employees where lastName like '%erson' ; -- cari data d karyawan yg lastnamenya punya huur B, belakang
select * from employees where lastName like '%p%' ; -- cari data d karyawan yg lastnamenya punya huur B, full search bisa cari tengah2,

-- where + not 
select * from products where productLine not in ('Classic cars', 'vintage cars'); -- ambil semua data product kecuali  classic car
select * from employees where lastname not like 'bo%'; -- ambil data yang  ga da huruf bo nya
select * from products where buyPrice not between 0 and 50.00; 

-- is null & is not nul
select * from customers where state is null; -- cari data yg statenya null
select * from customers where state is not null;

-- MATH OPERATOR (<, <=, =>, >, =, !=)
select customerNumber,customerName,creditLimit from customers where creditlimit > 100000; -- mcara data customer yg creditlimit 1000000
select customerNumber,customerName,creditLimit from customers where creditlimit = 0;
select customerNumber,customerName,creditLimit from customers where creditlimit != 0; 

-- MATH OPERATOR (-,+,*,/)
-- misal total pembelian ga boleh lebih dari 200.000
select *, 200000 - amount as sisa_Limit from payments; -- sisa limit dsini kolom tambhan, as itu alias 
select customerNumber,customerName,creditLimit, 50000 + creditLimit as final_limit from customers;
select customerNumber,customerName,creditLimit, 2 * creditLimit as final_limit from customers;
select customerNumber,customerName,creditLimit, creditLimit / 2 as final_limit from customers;

-- LIMIT  OFFSET 
-- cara pertama
select * from offices limit 5;-- memnbatasi brapa data yg akan kita ambil,
select * from offices limit 3 offset 2; -- ambil data mulai dari yg ke brapa, harus d ikuti dengan limit
-- cara kedua,pake short hand
select * from offices limit 3, 2; -- bilagna angka atau digit pertama itu jadi offset, digit kedua jd limit 
select customerNumber,customerName, creditLimit, country from customers where country in ('USA', 'France') limit 5;
select customerNumber,customerName, creditLimit, country from customers where country in ('USA', 'France') order by customerName limit 5;

-- LATIHAN!
-- 1) dapatkan data dari table customer ambil kolom customername, city, state, sm country, cari yg countrynya d USA dan france, d order by customername , 
-- limit 5 data, d  mulai dari data ke 3 
select customerName, city, state, country  from customers where country in ('USA', 'France')
order by customerName 
limit 5 offset 3; 

-- 2) get data customer salesRepEmployee !== null , country = germany, nama mengandung huruf n , dan urutkan berdasarkan nama 

select salesRepEmployeeNumber from customers where state is not null and country in ('germany');
select * from customers
where salesRepEmployeeNumber is not null
and country = 'germany'
and customerName like '%n%'
order by customerName;


-- 3) get data customer salerRepEmployee != null dan credit limit > 60000, 
-- urutkan berdasarkan credit limit dan di kasih limit 4 data dimulai setelah data ke 10


select * from customers
where salesRepEmployeeNumber is not null
and creditLimit > 60000
order by creditLimit
limit 4 offset 10; 

-- AGREGAT FUNCTION => CONCAT, COUNT, MAX, AVG, SUM

-- CONCAT menyambung antara satu kolom dengan kolom yg lain 
select * from customers;
select customerNumber, customerName, concat(contactLastName, contactFirstName) as fullname from customers;-- menggabungkan contactlastname dengan contact first name mnjadi satu kolom dngan kolom baru 
select customerNumber, customerName, concat(contactLastName, ' ', contactFirstName) as fullname from customers; -- menambahkan spasi agar lebih rapih

-- COUNT menghitung jumlah data/total keselurahn data
select * from offices;
select count(*) as total_office from offices;
select count(*) as total_customer from customers;
select count(*) as total_employee from employees;
select count(*) as total_products from products;


-- MIN, mencari data terendah
select min(amount) as jumlah_belanja_terendah from payments;
select min(amount) as jumlah_belanja_terendah from payments;
-- MAX, mencari data tertinggi atau terbanyak
select max(amount) as jumlah_belanja_tertinggi from payments;
-- AVG, mecari rata2 data 
select avg(amount) as rata2_belanja from payments;
-- SUM menambah atau menjumlah data
select sum(amount) as total_pembelian from payments;

-- LATIHAN 
-- 4) mencari total quantity pembelian dari data 0rder detail untuk ordernumbers 10100
select sum(quantityOrdered) as total_quantity_10100 from orderdetails
where orderNumber = 10100;

-- between use date data
select * from payments
where paymentDate between '2003-06-05' and '2004-10-19'
order by paymentDate;



















