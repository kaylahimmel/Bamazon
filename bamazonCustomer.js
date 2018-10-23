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
        console.log("You are now connected to Bamazon as User " + connection.threadId);
        buyItem();
    }
});


// table of table query data
var buildTable = connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(error, results) {
    // throw an error if there's an error
    if (error) {
        console.log(error)
    } else {
        // show a table of the items in the console if there is no error
        console.table(results);
    };
});


// "buyItem" function that shows the user a table of items and allows them to buy on them
function buyItem(error, results) {
    buildTable;
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
                console.log(results);
                if(error) {
                    console.log(error);
                };
                if (results.stock_quantity < userChoice.number) {
                    connection.query("DELETE FROM products WHERE item_id = ?", [userChoice.item_id], function(error, results) {
                        //START HERE--------------------------------------------------
                    })
                    console.log("There aren't that many available--please choose a lesser quantity.\n");
                };        
                // give user a successful purchase message
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [remainingStock, userChoice.choice]);
                console.log("Congrats--your purchase of " + results[0].product_name + " was successful!");
            });
        });
};