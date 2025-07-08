const { getCollection } = require('../connect');
const {ObjectId} = require('mongodb')//

async function updateParam(itemId, field, updatedItem) {
    // updateParam(1, Discount, 20) option 2
    const db = getCollection();
    //const documentId = ObjectId.createFromHexString(itemId)
    try {
        const results = await db.updateOne(
            { productId: itemId },
            { $set: { [field]: updatedItem}},
            { upsert: false }
        );
        //const results = await db.updateOne({ productID: itemId } , { $set: {Discount: updatedItem}});
        console.log("Discount updated: ", results);
        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { updateParam };