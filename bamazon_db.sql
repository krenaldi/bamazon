DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE departments (
department_id INT NOT NULL,
department_name VARCHAR(50) NOT NULL,
over_head_costs DECIMAL(6,2) NOT NULL
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (01, "Books", 35),
(02, "DVDs", 35),
(03, "Video Games", 125),
(04, "Pet Supplies", 35),
(05, "Electronics", 500),
(06, "Music", 35),
(07, "Computers", 1000);

CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("How To Code", "Books", 9.99, 25), 
("Red Dead Redemption 2", "Video Games", 59.99, 15), 
("Quentin Tarantino Collection", "DVDs", 69.50, 20),
("Cat Toy", "Pet Supplies", 12.50, 35),
("Macbook Pro", "Computers", 1050.00, 8),
("iPhone X", "Electronics", 899.99, 6),
("Canon Printer", "Electronics", 119.00, 10),
("Cat Food", "Pet Supplies", 14.98, 40),
("AC/DC Collection", "Music", 49.99, 20),
("The Ramones Collection", "Music", 39.99, 15);

SELECT * FROM products;

UPDATE products
SET stock_quantity = 8
WHERE item_id = 5;


