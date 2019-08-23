var mysql = require("mysql");
var inquirer = require("inquirer");

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
    viewInventory();
});

function viewInventory() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "SELECT ACTION",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInv();
                    break;

                case "Add to Inventory":
                    addInv();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT item_id AS 'ID', product_name AS 'Product', price AS 'Price', stock_quantity AS 'Inventory' FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        viewInventory();
    });
}

function viewLowInv() {
    connection.query("SELECT item_id AS 'ID', product_name AS 'Product', stock_quantity AS 'Inventory' FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        viewInventory();
    });
}

function addInv() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter the item_id for the product you want to add inventory to"
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the number of products you want to add",
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

            // Query db for the product
            connection.query("SELECT * FROM products WHERE ?",
                { item_id: item }, function (err, results) {

                    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?",
                            [quantity,
                                {
                                item_id: item
                            }],
                        function (err, results) {
                            if (err) throw err;
                            console.log("Inventory for increased by " + quantity);
                            viewInventory();
                        });
                });
        });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Please enter the product name"
        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter the department name for this product"
        },
        {
            name: "price",
            type: "input",
            message: "Please enter the price for this product"
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the quantity of products available",
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
            var product = answer.product_name;
            var dept = answer.department_name;
            var price = answer.price;
            var quantity = answer.quantity;

            // Query db for all products
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: product,
                    department_name: dept,
                    price: price,
                    stock_quantity: quantity
                },
                function (err, results) {
                    if (err) throw err;
                    console.log("PRODUCT ADDED");
                    console.table(results);
                    viewInventory();
                });
        });
}