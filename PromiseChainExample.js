//This is an example of creating a promise.
// It creates a createOrder promise and checks if the cart is valid and returns the value as per the case.

const cart = ["Item1", "Item2", "Item3", "Item4"]

//Consumer End.
// This will create a promise and createOrder will return OrderID
const prom = createOrder(cart)

// When the createOrder returns OrderID, then proceedToPayment will be executed.
prom.then(function(OrderID){
    return OrderID;     //This Order ID is passed to proceedToPayment()

})
.then(function (OrderID){
    console.log(OrderID);
    return proceedToPayment(OrderID);

})
.then(function (PaymentInfo){
    console.log(PaymentInfo);
})
.catch(function (err) {
    console.log(err.message);

});


// Producer End.
function createOrder(cart){

    // Creating a new promise by name pr, it uses Promise() constructor
    const pr = new Promise(function(resolve, reject){

        //Here we will write our logic createOrder function. i.e., whatever create order function needs to do.
        // Like check if the item is in stock, validateCart, etc.
        // Return OrderID, if card is valid else return an error.

        if (!validateCart()){
            const err = new Error("Invalid Cart.");
            reject(err);
        }

        const OrderID = "OrderID1234";

        if (OrderID){
            resolve(OrderID);
        }

    });
    return pr;
}

function validateCart(){

    //true for fulfilled and false for rejected.
    return true;
}

function proceedToPayment(OrderID){

    const payment_success = false;

    const pr = new Promise(function(resolve, reject){
        if (payment_success && OrderID){
            resolve("Payment Successful.")
        }
        else{
            const err = new Error("Payment Declined.");
            reject(err);
        }
    });
    return pr;
}
