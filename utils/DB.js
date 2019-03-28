const uri = require("../config/uri");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const client = new MongoClient(uri.mlab, { useNewUrlParser: true });
const dbName = "backend-assistant";
const collection = 'Reservas';
let db;

const connect = async () => {
  await client.connect();
  db = client.db(dbName);
}

const query = async (coll, predicate) => {
  try {
    await connect();
    let results = db.collection(coll).find(predicate).toArray();
    return results;
  } catch (e) {
    console.error(e.stack);
    throw (e.stack);
  }
  client.close();
}

const findAll = () => {
  return query(collection, {});
}

const findById = (id) => {
  return query(collection, { _id: ObjectId(id) });
}

exports.findAll = findAll;
exports.findById = findById;
