const { getCollection } = require('../connect');
const {ObjectId} = require('mongodb')//

async function updateParam(itemId, updatedItem) {
    // updateParam(1, Discount, 20) option 2
    const db = getCollection();
    itemId = parseInt(itemId);
    //const documentId = ObjectId.createFromHexString(itemId)
    try {
        const results = await db.updateOne(
            { productId: itemId },
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