# bamazon

## Node.js & MySQL

### Overview

An Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

### 1. Customer View

MySQL database called `bamazon` created with table inside called `products`. The products table has 10 items inserted with the following columns:

* item_id (unique id for each product)

* product_name (Name of product)

* department_name

* price (cost to customer)

* stock_quantity (how much of the product is available in stores)

Customer runs a Node app called `bamazonCustomer.js` which first displays all of the items available for sale minus the stock quantity. 

[![Image of first screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot1.png)]

The app then prompts users with two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

[![Image of 2nd screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot2.png)]

If the store _does_ have enough of the product, the customer's order is fulfilled and updates the SQL database to reflect the remaining quantity and shows the customer the total cost of their purchase.

[![Image of mysql db screenshot](https://github.com/krenaldi/bamazon/blob/master/images/mysql-screenshot1.png)]

### 2. Manager View

A new Node application called `bamazonManager.js` that lists a set of menu options:

* View Products for Sale

* View Low Inventory

* Add to Inventory

* Add New Product

* Exit

[![Image of 3rd screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot3.png)]

If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

[![Image of 4th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot4.png)]

If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

[![Image of 5th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot5.png)]

If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

[![Image of 6th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot6.png)]

If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

[![Image of 7th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot7.png)]

### 3. Supervisor View

A new Node application called `bamazonSupervisor.js` that lists a set of menu options:

* View Product Sales by Department

* Create New Department

* Exit

[![Image of 8th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot8.png)]

When a supervisor selects `View Product Sales by Department`, the app will display the following summarized table in their terminal/bash window based on a new table called `departments` created in the bamazon schema.

[![Image of 9th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot9.png)]

The `total_profit` column is a customer aliias and is calculated on the fly using the difference between `over_head_costs` and `product_sales` by joining the `departments` and `products` table and ordering the table by Department ID.

The  `Create New Department` option allows the supervisor to add a new department much in the same way that the manager can add a new product in the `bamazonManager.js` app.

[![Image of 10th screenshot](https://github.com/krenaldi/bamazon/blob/master/images/bamazon-screenshot10.png)]
