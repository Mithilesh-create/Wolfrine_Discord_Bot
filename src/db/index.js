const mongoose = require("mongoose");
const uri = process.env.DB_URI;

module.exports = async function getDb() {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to db............");
    })
    .catch((e) => {
      console.log("error", e);
    });
};
