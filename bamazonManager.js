// REQUIRED PACKAGES/VARIABLES----------------------------------------------------------------------------
var mysql = require("mysql");

var inquirer = require("inquirer");

var consoleTable = require('console.table');


// MYSQL connection credentials
var connectMySql = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // remove username and password for final push
    user: "root",
    password: "root",
    database: "bamazon"
});
 

// Connect to MySQL and run the "buyOrSell" function
connectMySql.connect(function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log("You are now connected to Bamazon as user: " + connectMySql.threadId);
        buyOrSell();
    }
});


// "afterConnect" function where a table is created of the availalble products
function afterConnect() {
    // create table of items, only showing id, name and quantity of each (not department)
    connectMySql.query("SELECT item_id,product_name,stock_quantity FROM products", function(error, response) {
        // throw an error if there's an error
        if (error) {
            console.log(error)
        } else {
            // show a table of the items in the console if there is no error
            console.table(response);
        }
        // end connection to MySQL to close the loop
        connectMySql.end();
    });
};


// "buyOrSell" function that prompts the user to sell an item or buy on a an item
function buyOrSell() {
    // prompt the user to buy or sell an item
    inquirer
        .prompt({
            name: "actions",
            type: "rawlist",
            message: "Would you like to buy on or sell an item? Choose '1' to buy, '2' to sell.",
            choices: ["BUY", "SELL"]
        })
        .then(function(input) {
            // based on their input, either call the buy or the SELL functions
            if (input.actions === "2" || input.actions === 2) {
                sellItem();
            } 
            else {
                buyItem();
            }
        });
};


// "buyItem" function that shows the user a table of items and allows them to buy on them
function buyItem(error, results) {
    // query the database and build a table for all items being auctioned
    connectMySql.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(error, results) {
        // throw an error if the connectMySql.query doesn't work
        if (error) {
            console.log(error)
        };
        // prompt the user for which they'd like to buy on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which product would you like to buy? (Type the item ID then push the 'Enter' key to make your selection"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function(results) {
                var purchaseQty = results.quantity;
                var remainingStock = (results.stock_quantity - purchaseQty);

                if(remainingStock >= 0) {
                    connectMySql.query("UPDATE products SET stock_quantity = " + remainingStock + " WHERE item_id=" + choice, function(error, results) {
                        if(error) {
                            console.log(error);
                        }
                        // update table of items
                        afterConnect();
                        // give user a successful purchase message
                        function message(){
                            console.log("Congrats! You just purchased " + purchaseQty + " " + product_name + ".");
                        };
                    });
                } else {
                    console.log("There aren't that many " + results.product_name + " available--please choose a lesser quantity.\n");
                    buyItem(results);
                }
            });
        });
};



// KEEP THIS SECTION IS FOR THE BAMAZONMANAGER.JS FILE (not needed for customer file though)

// // "SELLITEM" function that allows user to add an item to be sold
// function sellItem() {
//     // prompt for info about the item being put up for auction
//     inquirer
//         .prompt([
//             {
//                 name: "product_name",
//                 type: "input",
//                 message: "Enter a name for your item."
//             },
//             {
//                 name: "department_name",
//                 type: "list",
//                 message: "What department or category is this item? (Use arrow keys to tab through the list and push 'Enter' key when done.)",
//                 choices: ["Pet Items", "Clothing/Shoes", "Automotive", "Sporting Equipment", "Household/Cooking", "Miscellaneous"]
//             },
//             {
//                 name: "price",
//                 type: "input",
//                 message: "Set the price for your item. (Do not include dollar sign.)",
//             },
//             {
//                 name: "stock_quantity",
//                 type: "input",
//                 message: "Enter the quantity.",
//             }
//         ])
//         .then(function(input) {
//             // After user has input info for all 4 prompts, add their item to the products table
//             connectMySql.query(
//                 "INSERT INTO products SET ?",
//                 {
//                     product_name: input.product_name,
//                     department_name: input.department_name,
//                     starting_price: input.price,
//                     stock_quantity: input.stock_quantity
//                 },
//                 function(error, response) {
//                     if (error) {
//                         console.log(error)
//                     } else {
//                         console.log("Your item has been added to Bamazon successfully!");
//                         // update table of products in the console
//                         afterConnect()
//                         // re-prompt the user for if they want to BUY or SELL
//                         buyOrSell();
//                     }
//                 });
//         });
// };