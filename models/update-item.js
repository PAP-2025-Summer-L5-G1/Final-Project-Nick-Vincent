const { getCollection } = require('../connect');
const {ObjectId} = require('mongodb')//

async function updateItem(itemId, updatedItem) {
    const db = getCollection();
    const documentId = ObjectId.createFromHexString(itemId)
    try {
        const results = await db.updateOne({ _id: itemId } , { $set: updatedItem });
        console.log("Message updated: ", results);
        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { updateItem };