const { getCollection } = require('../connect');
const {ObjectId} = require('mongodb')//

async function updateParam(itemId, updatedItem) {
    const db = getCollection();
    const documentId = ObjectId.createFromHexString(itemId)
    try {
        const results = await db.updateOne(
            { _id: documentId },
            { $set: updatedItem },
            { upsert: false }
        );
        //const results = await db.updateOne({ productID: itemId } , { $set: {Discount: updatedItem}});
        console.log("Update Successful: ", results);

        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { updateParam };