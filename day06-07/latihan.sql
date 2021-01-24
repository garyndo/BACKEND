-- LATIHAN
-- 1) tampilkan data customers yang ada di negara USA yang mempunyai credit limit diatas rata2 credit limit customers di Germany

select avg(creditLimit) from customers
where country = 'germany';

select customerName, city, country, creditLimit from customers
where country = 'USA'
and creditLimit > (
	select avg(creditLimit) from customers
	where country = 'germany'
)
order by creditLimit;

-- buat data dengan hasil 
select customerNumber, customerName, country, creditLimit, employeeNumber, concat(lastname, ',', firstname) as sales_name, email from customers c
inner join employees e
on c.salesRepEmployeeNumber = e.employeeNumber
order by customerNumber;
 
-- 2)tampilkan data orderdetail, hitunglah total quantity dan total price per order number
-- dengan ketentuan total price diatas rata2 semua total price per order number dan 
-- total quantity diatas rata2 semua total quantity per order number
-- HINT rata2 total quantity 323

select * from orderdetails;
-- step 1 cari terlebih dahulu point k 3  rata2 semua total quantity per order number
select orderNumber,sum(quantityOrdered) 'total_qty' from orderdetails
group by orderNumber;
-- step 2 cari rata2 atau avareganye 
select avg(total_qty) as rata2_totalqty from (
select sum(quantityOrdered) 'total_qty' from orderdetails
group by orderNumber
) as list_total_qty;
-- step 3 mulai point k2 cari totalprice per ordernumber
select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber;
-- step 4 mulai point k2 cari rata2 totalprice per ordernumber
select avg(total_price) as avg_total_price from (
select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber
) list_total_price;

-- NOTE , DDLM SUBQUERY HANYA DEFINED 1 KOLOM KETIKA KITA MEMAKAI PERANDIGAN, karna d atas hanya avg total_prcie, jadi boleh pake lbh dr total 1 klom
-- BISA LEWATI STEP 1 JGA
-- step 5 gabung avg total qty dan avg total price k point ke 1 ke kondisi total quantity dan total price per order number
 
select orderNumber,sum(quantityOrdered) 'total_qty',  sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber
having total_qty > (
	select avg(total_qty) as rata2_totalqty from (
		select sum(quantityOrdered) 'total_qty' from orderdetails
		group by orderNumber
		) as list_total_qty
) 
and total_price > (
	select avg(total_price) as avg_total_price from (
		select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
		group by orderNumber
		) list_total_price
);
-- DONE 
-- query untuk mengetahui jumlah result seteelah filtering d atas
select count(*) result from (
select orderNumber,sum(quantityOrdered) 'total_qty',  sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber
having total_qty > (
	select avg(total_qty) as rata2_totalqty from (
		select sum(quantityOrdered) 'total_qty' from orderdetails
		group by orderNumber
		) as list_total_qty
) 
and total_price > (
	select avg(total_price) as avg_total_price from (
		select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
		group by orderNumber
		) list_total_price
)
) as list_result;









