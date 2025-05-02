const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

(async () => {
  try {
    await client.connect();
    console.log("Koneksi berhasil");
  } catch (error) {
    console.error(error);
  }
})();

module.exports = client;
