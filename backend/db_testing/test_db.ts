import { MongoClient} from "mongodb"

const mongodb_uri = process.env.MONGO_DB_URI as string;
const client = new MongoClient(mongodb_uri, { useNewUrlParser: true });

/* "sample_analytics"  "accounts"   */
client.connect(async err => {
    if (err) {
        console.error(err)
    }
    console.log("CONECTED WITH DB")
    const collection = client.db("sample_analytics").collection("accounts", () => console.log(`Found collection accounts`));
    const found = await collection.find({ limit: { $lt: 10000 } }).toArray()
    console.log(found)
    client.close()
});
