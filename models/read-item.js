const { getCollection } = require('../connect');

async function getItem(productId) {
    //Practice Session
    const db = getCollection();
    try {
        const results = await db.find({ productId: productId }).toArray();
        console.log("Product: ", results);
        return results;
    } catch (e) {
        console.log(e);
    }
}

async function getAllItems() {
    //Practice Session
    const db = getCollection();
    try {
        const results = await db.find({}).toArray();
        console.log("Product: ", results);
        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { getItem, getAllItems };