const {getCollection} = require('../connect');
const { ObjectId } = require('mongodb')

// Accepts deleteItem({field : value})
async function deleteItem(id) {
    const db = getCollection()
    console.log("hi we testing delete:", id);
    const documentId = ObjectId.createFromHexString(id);
    try {
        const res = await db.deleteOne({_id: documentId})
        return res
    } catch (e) {
        console.error(e)
    }
}

module.exports = {deleteItem}