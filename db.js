// mongodb.js
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://alirf50:YKyppMspy6VHczDI@cluster0.b1blcu3.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URI
// const uri =process.env.MONGODB_URI; // Replace with your MongoDB connection URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
let client;
let cachedDb;

// const client = new MongoClient(uri, options);

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);

    await client.connect();
    cachedDb = client.db("scotland-tiles-test"); // Replace with your database name
  }
  return cachedDb;
}
export default connectToDatabase;
