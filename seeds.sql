DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

SELECT * FROM products

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Dog Collar", "Pet Items", 20, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Backup Camera System", "Automotive", 80, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lightly-used 4-person Tent", "Sporting Equipment", 50, 1);

DELETE FROM products WHERE item_id = 2;
UPDATE products SET item_id = 1 WHERE item_id = 16;
UPDATE products SET stock_quantity = 7 WHERE item_id = 1;
UPDATE products SET item_id = 16 WHERE item_id = 30;