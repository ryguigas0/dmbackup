import { MongoError, MongoClient, Collection } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const mongodb_uri = process.env.MONGO_DB_URI as string;
const client = new MongoClient(mongodb_uri, { useNewUrlParser: true });

export default {
    /* "sample_analytics"  "accounts"   */
    async openConnection(callback: (err: MongoError, collection: Collection) => void) {
        client.connect(async (err) => {
            console.log("CONECTED WITH DB");
            const collection = client.db("character")
                .collection("info", () => console.log(`Found collection info`));
            callback(err, collection);
        });
    },
    closeConnection() {
        client.close()
    }
}