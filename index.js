const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { connectMongoDB } = require('./connect');
const { createItem } = require("./models/create-item");

app.use(cors());
app.use(express.json())



//Home Route
/*app.get('/inventory', async (req, res) => {
    const results = await getAllMessages(req.params.secret)
    res.send(results)
    console.log("GET request received on homepage")
});*/

//Subroute

//Dynamic Route

/* Exercise 5 
const { updateMessage } = require('./models/update-message');
updateMessage("Lynn", "I found my dog!"); */

//* ********************* Launching the server **************** */

const start = async () => {
    try {
        await connectMongoDB();
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    }
    catch (err) {
        console.error(err);
    }
}

start();

//Test
const newInventory =  {
	productId: 1,
    Title: "Waffle Maker",
    Price: 19.99,
    Discount: 15,
    Quantity: 10
}
//background math = price * (1 - 15*0.01),
createItem(newInventory);