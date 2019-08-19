var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootpass",

    // Your db
    database: "bamazon_db"
});

// connect to the mysql server
connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    // Run function after the connection that starts the prompt for the user
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        placeOrder();
    });
}

// function that prompts user to select item to pruchase
function placeOrder() {

    // once products are received, prompt user which item they want to buy
    inquirer
        .prompt([
            {
                name: "item_id",
                type: "input",
                message: "Please enter the item_id for the product you want to buy"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the number of products you want to buy",
                // Verifies input is a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // variables for user inputs
            var item = answer.item_id;
            var quantity = answer.quantity;

            // Query db for all products
            connection.query("SELECT * FROM products WHERE ?", { item_id: item }, function (err, results) {
                if (err) throw err;
                // determine if stock is available for number of purchases
                if (quantity <= results[0].stock_quantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: results[0].stock_quantity - quantity
                            },
                            {
                                item_id: item
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log("Order placed successfully! Total cost of purchase is $" + results[0].price * quantity + "\n-----------------------------\n");
                            inquirer.prompt({
                                name: "action",
                                type: "list",
                                message: "CONTINUE SHOPPING?",
                                choices: [
                                    "YES",
                                    "NO"
                                ]
                            }).then(function (answer) {
                                switch (answer.action) {
                                    case "YES":
                                        displayProducts();
                                        break;

                                    case "NO":
                                        connection.end();
                                        break;
                                }
                            });
                        }
                    );
                }
                else {
                    // if there isn't enough stock for number of purchases, tell user order cannot be placed
                    console.log("Sorry but there is in sufficient stock for your order. Please select a lower number items.");
                    displayProducts();
                }
            });
        });
}