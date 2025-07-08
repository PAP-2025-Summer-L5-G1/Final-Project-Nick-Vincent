const {getCollection} = require('../connect');

async function createItem(newItem) {
    try {
        const db = getCollection()
        await db.insertOne(newItem)
    } catch(e) {
        console.log(e)
    }
}

module.exports = {createItem}