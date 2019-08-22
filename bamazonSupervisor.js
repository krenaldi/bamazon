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
    console.log("connected as id " + connection.threadId + "\n");
    // Run function after the connection that starts the prompt for the user
    viewDepartments();
});

function viewDepartments() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "SELECT ACTION",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewDeptSales();
                    break;

                case "Create New Department":
                    createDept();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function createDept() {
    inquirer.prompt([
        {
            name: "department_id",
            type: "input",
            message: "Please enter new Department ID"
        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter the Department Name"
        },
        {
            name: "over_head_costs",
            type: "input",
            message: "Please enter the overhead costs for this department"
        }
    ]).then(function (answer) {
        // variables for user inputs
        var dept_id = answer.department_id;
        var dept = answer.department_name;
        var overhead = answer.over_head_costs;

        // Query db for all products
        connection.query("INSERT INTO departments SET ?",
        {
            department_id: dept_id,
            department_name: dept,
            over_head_costs: overhead
        },
        function (err, results) {
            if (err) throw err;
            console.log("DEPARTMENT ADDED");
            console.table(results);
            viewDepartments();
        });
    });
}