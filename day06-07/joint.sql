-- JOINT => kunci utama relation database 
--          menggabungkan beberapa tabel
--          ada 4 bentuk joint (inner,left, right, cross)
-- 1.INNER JOIN, menggabungkan tabel dengan foreign key, mengambl irisannya, yg ada d tengah2 d diagram ven, data yg tidak cocok akan d buang
select * from employees;
select * from offices;

SELECT e.employeeNumber, concat(e.firstName, ' ', e.lastName) as name, e.email, e.officeCode, o.city, o.phone FROM employees e
INNER JOIN offices o 
ON e.officeCode = o.officeCode;

CREATE TABLE members (
    member_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (member_id)
);

CREATE TABLE committees (
    committee_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (committee_id)
);

INSERT INTO members(name)
VALUES('John'),('Jane'),('Mary'),('David'),('Amelia');

INSERT INTO committees(name)
VALUES('John'),('Mary'),('Amelia'),('Joe');

select * from members;
truncate members;
select * from committees;
truncate committees;

-- INNER JOIN with ON, ketika nama kolomnya beda
select * from members m 
inner join committees c
on m.name = c.name;

-- INNER JOIN with USING, ketika nama kolomnya sama 
select * from members m 
inner join committees c
using(name);
 
-- LEFT JOIN => klo ada data yg tidak cocok, dia tidak d buang, tapi datanya d NULL kan
--              tble utama sebelah kanan
select * from members m 
left join committees c
on m.name = c.name;

-- RIGHT JOIN, kebalikan left, tble utama sebelah kanan
select * from members m 
right join committees c
on m.name = c.name; 

-- CROSS JOIN => menggabungkan seluruh data, 
-- 				tidak membutuhkan condition tiap item dari table sebelah kiri akan d pasagnakan dengan tiap  item d table seblahnya  
select * from members m 
cross join committees c;
