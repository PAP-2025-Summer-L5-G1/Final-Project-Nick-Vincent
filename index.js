const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { connectMongoDB } = require('./connect');
const { createItem } = require("./models/create-item");
const { updateParam } = require('./models/update-item');
const { getItem, getAllItems } = require('./models/read-item');
const { deleteItem } = require('./models/delete-item');

app.use(cors());
app.use(express.json())



//Home Route
app.get('/inventory', async (req, res) => {
    const results = await getAllItems()
    res.send(results)
    console.log("GET request received on homepage")
});

//Subroute
app.post('/inventory', async (req, res) => {
    const newItem = req.body;
    await createItem(newItem);
    res.sendStatus(201)
    console.log("POST request received on inventory route, Item Created")
});

//Dynamic Route
app.patch('/inventory/:id', async (req,res) => {
    console.log("flag")
    const editedItem = req.body;
    const result = await updateParam(req.params.id, editedItem);
    res.sendStatus(200);
})

app.delete('/inventory/:id', async (req,res) => {
    console.log("flag")
    const result = await deleteItem("productId", parseInt(req.params.id));
    res.sendStatus(200);
})


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
//deleteItem("productId", 2);

/*const newInventory =  {
	productId: 2,
    Title: "Coffee Maker",
    Price: 19.99,
    Discount: 15,
    Quantity: 10
}
//background math = price * (1 - 15*0.01),
createItem(newInventory);*/