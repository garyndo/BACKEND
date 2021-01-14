-- SUBQUERY => query didalam query
-- query1(query2(query3)), execution order => query 3 query 2 query 1

-- 6) hitung total customer per country, cari country yang rata2 credit limit nya di atas 50000
-- hit total cust tiap negara,
-- cari negara yg rata2 kredit limitnya d atas 50000
select country, avg(creditLimit) as rata2_credlim, count(country) as total_customer from customers
group by country
having rata2_credlim > 50000
order by country;


-- 1) tampilkan rata2 credit tiap negara, cari negara yg rata2 credit kimitnya d atas USA 
-- step 1 cari dlu credit limit USA
select country, avg(creditLimit) as avg_CL_USA from customers
where country = 'USA';

-- step 2 setelah dapat CL USA  
-- kita gunakan subquery dengan contoh soal nomer 6 sblmnya, tanpa memakai country karna kita hanya gunakan avg CL USA 
select country, avg(creditLimit) as rata2_credlim, count(country) as total_customer from customers
group by country
having rata2_credlim >= (
	select avg(creditLimit) as avg_CL_USA from customers
	where country = 'USA'
)
order by country; 

-- 2) hitung berapa jumlah country yg limitnya d atas avg limit USA 

SELECT 
    COUNT(*) AS result
FROM
    (SELECT 
        country,
            AVG(creditLimit) AS rata2_credlim,
            COUNT(country) AS total_customer
    FROM
        customers
    GROUP BY country
    HAVING rata2_credlim > (SELECT 
            AVG(creditLimit) AS avg_CL_USA
        FROM
            customers
        WHERE
            country = 'USA')
    ORDER BY country) AS list_CL;