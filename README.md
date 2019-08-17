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

![Image of first screenshot] (./images/bamazon-screenshot1.png)

The app then prompts users with two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

![Image of 2nd screenshot] (./images/bamazon-screenshot2.png)

If the store _does_ have enough of the product, the customer's order is fulfilled and updates the SQL database to reflect the remaining quantity and shows the customer the total cost of their purchase.

![Image of mysql db screenshot] (./images/mysql-screenshot1.png)
