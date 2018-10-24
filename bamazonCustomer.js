// REQUIRED PACKAGES/VARIABLES----------------------------------------------------------------------------
var mysql = require("mysql");

var inquirer = require("inquirer");

var consoleTable = require('console.table');


// MYSQL connection credentials
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // remove username and password for final push
    user: "root",
    password: "root",
    database: "bamazon"
});
 

// Connect to MySQL and run the "buyOrSell" function
connection.connect(function(error) {
    if (error) {
        console.log(error)
    } else {
        // show the thread connection as the "Bamazon user number"
        console.log("You are now connected to Bamazon as User " + connection.threadId + "\n");
        removeItems();
        buildTable();  
        buyItem();       
    }
});


// table of table query data
function buildTable() {
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(error, results) {
        // throw an error if there's an error
        if (error) {
            console.log(error)
        }
    }) 
};


// "removeItems" function that removes unavailable items from the table
function removeItems() {
    connection.query("SELECT item_id FROM products", function(error, results) {
        for (i = 0; i < results.length; i++) {
            if (results[i].stock_quantity === 0) {
                connection.query("DELETE FROM products WHERE item_id = ?", [results[i].item_id], function(error, results) {
                    // show a table of the items in the console if there is no error
                    console.log(results[i].product_name + " has been removed from the available products list."); 
                });      
            }
        };
});


// "shopAgain" function that prompts the user to make another purchase or ends the session
function shopAgain() {
    inquirer
            .prompt([
                {
                    name: "again",
                    type: "list",
                    response: "[Yes, No]",
                    message: "Would you like to purchase another item?"
                }
            ]).then(function(error, results) {
                if (error) {
                    console.log(error)
                };
                if (results.response === "Yes") {
                    removeItems();
                    buildTable(); 
                    buyItem();
                } else {
                    console.log("Thank you for your order. Goodbye.")
                    connection.end();
                }
            });   
};


// "buyItem" function that updates available items then shows the user a table of items and prompts them to buy on them
function buyItem(error, results) {
    // prompt the user to choose an item to buy
    inquirer
        .prompt([
            {
                name: "choice",
                list: function() {
                    // new array to hold the items
                    var itemsForSale = [];
                    for (var i = 0; i < results.length; i++) {
                        itemsForSale.push(results[i].item_id);
                    }
                    return itemsForSale;
                },
                message: "Which product would you like to buy? (Type the item ID then push the 'Enter' key to make your selection"
            },
            {
                name: "number",
                // type: "input",
                message: "How many units would you like to buy?"
            }
        ]).then(function(userChoice) {
            connection.query("SELECT stock_quantity, price, product_name FROM products WHERE item_id = ?", [userChoice.choice], function(error, results) {
                var purchaseQty = userChoice.number; 
                var remainingStock = parseInt(results[0].stock_quantity - purchaseQty);
                if(error) {
                    console.log(error);
                };
                // if the quantity of the item selected = 0, delete the item from the table and have the user choose another item
                if (results[0].stock_quantity === 0) {
                    connection.query("DELETE FROM products WHERE item_id = ?", [userChoice.item_id], function(error, results) {
                        console.log("That item is unavailable--please select another.\n")
                    });  
                // if the amount of available stock is less than the quantity entered by the user, have them select a lesser amount    
                } else if (results[0].stock_quantity < userChoice.number) {
                    console.log("There aren't that many available--please choose a lesser quantity.\n");
                } 
                // give user a successful purchase message
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [remainingStock, userChoice.choice]);
                console.log("Congrats--your purchase of " + results[0].product_name + " was successful!\n");
            });
        }); 
    shopAgain();       
};