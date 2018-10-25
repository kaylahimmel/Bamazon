# Bamazon

Welcome to Bamazon, an Amazon-esque, garage sale-style storefront that uses the Command Line Interface in Node.js. 

### Step 1: Initiate the App
![Image of Terminal Console with text to type in to initialize Bamazon]
(https://github.com/kaylahimmel/Bamazon/blob/master/screenshots/bamazon_step1.png?raw=true)

To use Bamazon you'll first need to initiate the app in the Terminal console by typing:
node bamazonCustomer.js
Then press the 'Enter' key.

### Step 2: Choose an Item
![Image of Terminal Console with text to type in to initialize Bamazon]
(https://github.com/kaylahimmel/Bamazon/blob/master/screenshots/bamazon_step2.png?raw=true)

A table of items, prices, and quantities will generate. From this table, you will be prompted to choose an item to purchase. Do so by typing the item's corresponding ID from the first column, then press the 'Enter' key.

### Step 3: Choose a Quantity to Purchase
![Image of Terminal Console with text to type in to initialize Bamazon]
(https://github.com/kaylahimmel/Bamazon/blob/master/screenshots/bamazon_step3.png?raw=true)

You will then be prompted to choose a quantity to purchase. Do so by typing in a number that is equal to or less than the quantity available as shown in the table. Once you have typed in the quantity you would like to purchase, press the 'Enter' key.

While choosing your item and quantity to purchase, please keep in mind that you will receive an error if you choose an item ID that does not exist or an amount that is more than the available quantity. If you do so in either case, you will be asked to choose a new item or quantity.

### Step 4: Make Another Purchase or Exit the App
![Image of Terminal Console with text to type in to initialize Bamazon]
(https://github.com/kaylahimmel/Bamazon/blob/master/screenshots/bamazon_step4_yes_results?raw=true)

If the item ID exists and the quantity you've chosen is available, your purchase will be completed and you will be prompted to make another purchase or exit Bamazon. If you choose to make another purchase, use the arrow keys to select 'Yes', then push the 'Enter' key. The table of available items will update and regenerate and you will be prompted to choose an item.

![Image of Terminal Console with text to type in to initialize Bamazon]
(https://github.com/kaylahimmel/Bamazon/blob/master/screenshots/bamazon_step4_no_results?raw=true)

If you've chosen not to make another purchase, use the arrow keys to select 'No', then push the 'Enter' key.
