-- DISTINCT => membuat data yang sama akan mmbuat data itu jadi satu
--                    membuat data yg duplicate mnjadi 1 jenis
select lastName from employees;
-- dalam table employee ada data yg sama seperti patterson ada 3 bondur ada 2
-- nah klo kita mau buat itu jadi satu
select distinct lastName from employees; 
-- hasilnya patterson sm bondur jadi 1 jenis

-- distinct untuk 2 kolom, 
select * from customers; 
select distinct state, city from customers where state is not null; 
-- NY NYC jadi hanya satu

-- GROUP BY => grouping daya,KLO ADA DATA YG SAMA AKAN D KLOMPOKAN, 
--             biasanya d ikuti dengan  agregaat function (count min max avg sum)

select country, count(*) as total_customers_perCountry from customers
group by country
order by country;

select status, count(*) as total_perstatus from orders
group by status
order by status;

select * from orderdetails;
select orderNumber, sum(quantityOrdered) as total_quantity from orderdetails
group by orderNumber
order by orderNumber;

-- CONTOH SOAL 
-- 1) get total data user , group by salesRepEmployeeNumber and count total customer
-- cari total customers per salesrepemployeenumber nya
select salesRepEmployeeNumber, count(*) as total_customers from customers
group by salesRepEmployeeNumber
order by salesRepEmployeeNumber;
-- 2) hitung total blanja dan harga yg harus pembelanjaan tiap order number
select orderNumber, sum(quantityOrdered) as total_qty, 
sum(quantityOrdered * priceEach) as total_belanja from orderdetails
group by orderNumber
order by orderNumber;



