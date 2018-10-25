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
        buyItem();
    }
});


// table of table query data
function buildTable () {
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(error, results) {
        // throw an error if there's an error
        if (error) {
            console.log(error)
        } else {
            // show a table of the items in the console if there is no error
            console.table(results);
        };
    });
};

// remove items from table that are not in stock
function removeItems() {
    connection.query("DELETE FROM products WHERE stock_quantity=0", function(error, results) {
        // throw an error if there's an error
        if (error) {
            console.log(error)
        }
    });
};


// ask user if they want to make another purchase
function shopAgain(error, results) {
    inquirer 
        .prompt([
            {
                name: "again",
                type: "list",
                message: "Would you like to make another purchase?",
                choices: ["Yes", "No"]
            }
        ]).then(function(userChoice) {
            if (userChoice.again === "Yes" || userChoice.again === 0) {
                buyItem();
            } else {
                console.log("Thank you for shopping at Bamazon, see you next time.");
                connection.end();
            }
        });   
}


// "buyItem" function that shows the user a table of items and allows them to buy on them
function buyItem(error, results) {
    buildTable();
    // setTimeout(myFunc, 1500, 'funky');
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
                message: "How many units would you like to buy?"
            }
        ]).then(function(userChoice) {
            connection.query("SELECT stock_quantity, price, product_name FROM products WHERE item_id = ?", [userChoice.choice], function(error, results) {
                var purchaseQty = userChoice.number; 
                var remainingStock = parseInt(results[0].stock_quantity - purchaseQty);
                if(error) {
                    console.log(error);
                };
                if (remainingStock < 0) {
                    return console.log("There aren't that many available--please choose a lesser quantity.\n");
                    buyItem();
                } else {
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [remainingStock, userChoice.choice]);
                    // give user a successful purchase message
                    console.log("Congrats--your purchase of " + results[0].product_name + " was successful!\n");
                    removeItems();
                    shopAgain();       
                }        
            });
        });
};