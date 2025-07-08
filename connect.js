require('dotenv').config({ path: './.env' });
const atlasURI = process.env.DB_CONNECTION;
const db = process.env.DB_NAME;
const coll = process.env.DB_COLLECTION_NAME;

const { MongoClient } = require('mongodb');
const client = new MongoClient(atlasURI);

async function connectMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to database.")
    } catch (e) {
        console.error(e);
    }
}

const getCollection = () => {
    return client.db(db).collection(coll);
};

module.exports = { getCollection, connectMongoDB };