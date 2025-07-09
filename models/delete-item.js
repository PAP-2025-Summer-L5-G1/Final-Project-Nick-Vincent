const {getCollection} = require('../connect');

// Accepts deleteItem({field : value})
async function deleteItem(field, value) {
    try {
        const db = getCollection()
        const res = await db.deleteOne({[field]: value})
        return res
    } catch (e) {
        console.error(e)
    }
}

module.exports = {deleteItem}