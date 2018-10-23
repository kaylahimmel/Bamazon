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

-- ALTER TABLE products CHANGE price starting_BID DECIMAL(10,2) NULL;

-- ALTER TABLE products
-- ADD COLUMN highest_BID DECIMAL(10,2) NULL AFTER starting_BID;

-- UPDATE products SET highest_BID = 70 WHERE item_id = 1;
-- UPDATE products SET highest_BID = 160 WHERE item_id = 2;
-- UPDATE products SET highest_BID = 130 WHERE item_id = 3;
-- UPDATE products SET highest_BID = 100 WHERE item_id = 4;
-- UPDATE products SET highest_BID = 110 WHERE item_id = 5;
-- UPDATE products SET highest_BID = 150 WHERE item_id = 6;
-- UPDATE products SET highest_BID = 250 WHERE item_id = 7;
-- UPDATE products SET highest_BID = 90 WHERE item_id = 8;
-- UPDATE products SET highest_BID = 200 WHERE item_id = 9;
-- UPDATE products SET highest_BID = 65 WHERE item_id = 10;

-- DELETE FROM products WHERE item_id = 12;
-- DELETE FROM products WHERE item_id = 13;
-- DELETE FROM products WHERE item_id = 14;
-- DELETE FROM products WHERE item_id = 15;
-- DELETE FROM products WHERE item_id = 16;
-- DELETE FROM products WHERE item_id = 17;
-- DELETE FROM products WHERE item_id = 18;
-- DELETE FROM products WHERE item_id = 19;
-- DELETE FROM products WHERE item_id = 20;
-- DELETE FROM products WHERE item_id = 21;
-- DELETE FROM products WHERE item_id = 22;
-- DELETE FROM products WHERE item_id = 23;
-- DELETE FROM products WHERE item_id = 24;

-- UPDATE products SET item_id = 11 WHERE item_id = 25;
-- UPDATE products SET item_id = 13 WHERE item_id = 27;
-- UPDATE products SET item_id = 12 WHERE item_id = 26;
-- UPDATE products SET item_id = 14 WHERE item_id = 28;
-- UPDATE products SET item_id = 15 WHERE item_id = 29;
-- UPDATE products SET item_id = 16 WHERE item_id = 30;

-- ALTER TABLE products CHANGE starting_BID price DECIMAL(10,2) NULL;
-- ALTER TABLE products
-- DROP highest_BID