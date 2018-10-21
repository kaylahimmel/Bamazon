// REQUIRED PACKAGES/VARIABLES----------------------------------------------------------------------------
var mysql = require("mysql");

var inquirer = require("inquirer");

var consoleTable = require('console.table');
// run console.table(response) now instead of just console.log(response) and a nice table will appear in the Terminal


// MYSQL connection credentials
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    user: "root",
    password: "",
    database: "bamazon"
});
 

// Connect to MySQL and run the "CHOOSEACTION" function
connection.connect(function(error) {
    if (error) {
        console.log(error)
    };
    console.log("connected as id " + connection.threadId);
    chooseAction();
});


// "CHOOSEACTION" function that prompts the user to sell an item or buy an item
function chooseAction() {
    inquirer
        .prompt({
            name: "actions",
            type: "rawlist",
            message: "Would you like to [SELL] an item or [BUY] on an item?",
            choices: ["SELL", "BUY"]
        })
        .then(function(answer) {
            // based on their answer, either call the BUY or the SELL functions
            if (answer.actions === "SELL") {
                sellAnItem();
        } else {
            buyAnItem();
        }
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
            message: "What department or category is this item?",
            choices: ["Pet Items", "Clothing/Shoes", "Automotive", "Sporting Equipment", "Household/Cooking", "Miscellaneous"]
        },
        {
            name: "price",
            type: "input",
            message: "Set the price for your item.",
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Enter the quantity.",
        }
    ])
    .then(function(answer) {
        // After user has input info for all 4 prompts, add their item to the products table
        connection.query(
            "INSERT INTO auctions SET ?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                starting_BUY: answer.startingBUY,
                highest_BUY: answer.startingBUY
            },
            function(error) {
                if (error) {
                    console.log(error)
                } else {
                console.log("Your auction was created successfully!");
                // re-prompt the user for if they want to BUY or SELL
                start();
                }
            ));
    });
};


// "BUYANITEM" function that shows the user a table of items and allows them to bid on them
function buyAnItem() {
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
                    message: "What auction would you like to place a bid in?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function(answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                    chosenItem = results[i];
                    }
                };
    
                // determine if bid was high enough
                if (chosenItem.highest_bid < parseInt(answer.bid)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE auctions SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function(error) {
                            if (error) {
                                console.log(error)
                            };
                            console.log("Your bid was placed successfully and is being considered.");
                            start();
                        });
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Too low--try adding a few dollars.");
                    start();
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

