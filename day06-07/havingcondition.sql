-- HAVING -> Conditional search
-- 			hampir samakaya where cm urutnnya beda
--          klo having biasanya setelah groupby
--          where ga bsa lagi d pake setelah constional grup by 
-- 2) hitung total blanja dan harga yg harus pembelanjaan tiap order number
select orderNumber, sum(quantityOrdered) as total_qty, 
sum(quantityOrdered * priceEach) as total_belanja from orderdetails
group by orderNumber
order by orderNumber;
-- 3) hitung total blanja dan harga yg harus pembelanjaan tiap order number
--    dan caritotalblanja yg d atas 50rb
select orderNumber, sum(quantityOrdered) as total_qty, 
sum(quantityOrdered * priceEach) as total_belanja from orderdetails
group by orderNumber
having total_belanja > 50000
order by orderNumber;
-- 4) hitung total blanja dan harga yg harus pembelanjaan tiap order number
--    dan caritotalblanja yg d atas 50rb
--    dan total qty lbh dr 600
select orderNumber, sum(quantityOrdered) as total_qty, 
sum(quantityOrdered * priceEach) as total_belanja from orderdetails
group by orderNumber
having total_belanja > 50000
and total_qty > 600;
-- 5) cari total customers per salesrepemployeenumber nya
-- cari employee yg total customersnya lbh dr 6
select salesRepEmployeeNumber, count(*) as total_customers from customers
where salesRepEmployeeNumber is not null
group by salesRepEmployeeNumber
having total_customers > 6
order by salesRepEmployeeNumber; 

-- 6) hitung total customer per country, cari country yang rata2 credit limit nya di atas 50000
-- hit total cust tiap negara,
-- cari negara yg rata2 kredit limitnya d atas 50000
select country, avg(creditLimit) as rata2_credlim, count(country) as total_customer from customers
group by country
having rata2_credlim > 50000
order by country;