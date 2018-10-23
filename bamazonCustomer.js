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
        console.log("You are now connected to Bamazon as User " + connectMySql.threadId);
        buyItem();
    }
});


// table of table query data
var buildTable = connectMySql.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(error, results) {
    // throw an error if there's an error
    if (error) {
        console.log(error)
    } else {
        // show a table of the items in the console if there is no error
        console.table(results);
    };
});

// // "afterConnect" function where a table is created of the availalble products
// function afterConnect() {
//     buildTable;
//     // end connection to MySQL to close the loop
//     connectMySql.end();
// };

// function queryDanceSongs() {
//     var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//     });
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }
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
                name: "quantity",
                // type: "input",
                message: "How many units would you like to buy?"
            }
        ]).then(function(userChoice) {
            connectMySql.query("SELECT quantity, price, product_name FROM products WHERE item_id = ?", [userChoice.choice], function(error, results) {
                var purchaseQty = userChoice.quantity; //works
                var remainingStock = parseInt(results.quantity - purchaseQty);
                if(error) {
                    console.log(error);
                };
                if (results[0].quantity < userChoice.quantity) {
                    console.log("There aren't that many available--please choose a lesser quantity.\n");
                };        
                // give user a successful purchase message
                connectMySql.query("UPDATE products SET quantity = ? WHERE item_id = ?", [remainingStock, userChoice.choice]);
                console.log("Congrats--your purchase of " + results[0].product_name + " was successful!");
            });
        });
};