DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

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
