const {getCollection} = require('../connect');
const {inputChecker} = require("./input-checker")

async function createItem(newItem) {
    if(inputChecker(newItem)){
        try {
            const db = getCollection()
            await db.insertOne(newItem)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = {createItem}