const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/carwash");
    console.log("Koneksi berhasil");
  } catch (err) {
    console.log(err);
  }
}

main();
