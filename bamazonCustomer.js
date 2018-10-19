// REQUIRED PACKAGES/VARIABLES----------------------------------------------------------------------------
var mysql = require("mysql");

var inquirer = require("inquirer");

var consoleTable = require('console.table');
// run console.table(response) now instead of just console.log(response) and a nice table will appear in the Terminal


// CREATE MYSQL CONNECTION
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
 
// CONNECT TO SQL 
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    chooseAction();
});

// "CHOOSEACTION" FUNCTION THAT PROMPTS THE USER TO POST AN ITEM OR BID ON AN ITEM
function chooseAction() {
    inquirer
        .prompt({
            name: "actions",
            type: "rawlist",
            message: "Would you like to [POST] an item or [BID] on an item?",
            choices: ["POST", "BID"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.actions === "POST") {
                postItem();
        } else {
            bidAuction();
        }
    });
};

//
// function to handle posting new items up for auction
function postItem() {
    // prompt for info about the item being put up for auction
    inquirer
    .prompt([
        {
            name: "product",
            type: "input",
            message: "Enter a name for your item."
        },
        {
            name: "department",
            type: "list",
            message: "What department or category is this item?",
            choices: ["Pet Items", "Clothing/Shoes", "Automotive", "Sporting Equipment", "Household/Cooking", "Miscellaneous"]
        },
        {
            name: "price",
            type: "input",
            message: "Set the price for your item.",
        }
    ])
    .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO auctions SET ?",
            {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid,
                highest_bid: answer.startingBid
            },
            function(err) {
                if (err) throw err;
                console.log("Your auction was created successfully!");
                // re-prompt the user for if they want to bid or post
                start();
            }
        );
    });
}


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

