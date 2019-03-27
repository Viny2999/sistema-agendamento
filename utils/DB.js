const uri = require("../config/uri");
const mongo = require("mongodb").MongoClient;

mongo.connect(uri.mlab, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db("backend-assistant");
});

