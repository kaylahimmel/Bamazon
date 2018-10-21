-- DROP DATABASE IF EXISTS bamazon;
-- CREATE DATABASE bamazon;

USE bamazon;

SELECT * FROM products

-- CREATE TABLE products (
--   item_id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(50) NULL,
--   department_name VARCHAR(50) NULL,
--   price DECIMAL(10,2) NULL,
--   stock_quantity INT NULL,
--   PRIMARY KEY (item_id)
-- );


-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Leather Dog Collar", "Pet Items", 20, 4);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Men's Running Shoes, Size 10", "Clothing/Shoes", 110, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Backup Camera System", "Automotive", 80, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Lightly-used 4-person Tent", "Sporting Equipment", 50, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("KitchenAid Mixer", "Household/Cooking", 200, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Survivor Set Memoribilia", "Miscellaneous", 100, 2);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("KitchenAid Mixer", "Household/Cooking", 200, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("10-qt Aquarium", "Pet Items", 40, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Women's Winter Coat, Size L", "Clothing/Shoes", 150, 1);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Tennis Racket", "Sporting Equipment", 15, 2);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Signed NBA Finals Program", "Miscellaneous", 60, 1);

-- DELETE FROM products WHERE item_id = 5;
-- UPDATE products SET item_id = 5 WHERE item_id = 11;
