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
 

// Connect to MySQL and run the "bidOrSell" function
connection.connect(function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log("connected as id " + connection.threadId);
        bidOrSell();
    }
});


// "bidOrSell" function that prompts the user to sell an item or bid on a an item
function bidOrSell() {
    inquirer
        .prompt({
            name: "actions",
            type: "rawlist",
            message: "Would you like to bid on or sell an item? Choose '1' to bid, '2' to sell.",
            choices: ["BID", "SELL"]
        })
        .then(function(input) {
            // based on their input, either call the bid or the SELL functions
            if (input.actions === "1") {
                bidOnItem();
            } else {
                sellAnItem();
            }
        });
};


// "bidOnItem" function that shows the user a table of items and allows them to bid on them
function bidOnItem() {
    // query the database and build a table for all items being auctioned
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) {
            console.log(error)
        };
        // prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_name);
                        }
                        return choiceArray;
                    },
                    message: "Which auction would you like to bid on?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function(input) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === input.choice) {
                    chosenItem = results[i];
                    }
                };
    
                // determine if bid was high enough
                if (chosenItem.highest_BID < parseInt(input_BID)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                highest_BID: input_BID
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function(error) {
                            if (error) {
                                console.log(error)
                            };
                            console.log("Your bid was accepted--congrats!");
                            bidOrSell();
                        });
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Too low--try adding a few dollars.");
                    bidOrSell();
                }
            });
        });
};


// "SELLANITEM" function that allows user to add an item to be sold
function sellAnItem() {
    // prompt for info about the item being put up for auction
    inquirer
    .prompt([
        {
            name: "product_name",
            type: "input",
            message: "Enter a name for your item."
        },
        {
            name: "department_name",
            type: "list",
            message: "What department or category is this item? (Use arrow keys to tab through the list and push 'Enter' key when done.)",
            choices: ["Pet Items", "Clothing/Shoes", "Automotive", "Sporting Equipment", "Household/Cooking", "Miscellaneous"]
        },
        {
            name: "starting_BID",
            type: "input",
            message: "Set the staring price for your item. (Do not include dollar sign.)",
        },
        {
            name: "highest_BID",
            type: "input",
            message: "Set the price that completes the auction immediately. (Do not include dollar sign.)",
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Enter the quantity.",
        }
    ])
    .then(function(input) {
        // After user has input info for all 4 prompts, add their item to the products table
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: input.product_name,
                department_name: input.department_name,
                starting_BID: input.starting_BID,
                highest_BID: input.highest_BID,
                stock_quantity: input.stock_quantity
            },
            function(error) {
                if (error) {
                    console.log(error)
                } else {
                console.log("Your auction was created successfully!");
                consoleTable();
                // re-prompt the user for if they want to BUY or SELL
                bidOrSell();
                }
            });
    });
};


// "AFTERCONNECTION" function where a table is created of the availalble products
function afterConnection() {
    connection.query("SELECT * FROM products", function(error, res) {
        if (error) {
            console.log(error)
        } else {
            consoleTable();
        }
        connection.end();
    });
};

