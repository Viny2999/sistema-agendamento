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

const find = async (coll, predicate) => {
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
  return find(collection, {});
}

const findById = (id) => {
  return find(collection, { _id: ObjectId(id) });
}

const findByDate = (rangeDate) => {
  return find(collection, {
    tipo: rangeDate.tipo,
    inicioEm: { $gte: new Date(rangeDate.inicioEm) },
    fimEm: { $lte: new Date(rangeDate.fimEm) }
  });
}

const insertOne = async (obj) => {
  try {
    await connect();
    db.collection(collection).insertOne(obj);
    return obj;
  } catch (e) {
    console.error(e.stack);
    throw (e.stack);
  }
  client.close();
}

const updateOne = async (id, obj) => {
  try {
    await connect();
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: obj });
    return obj;
  } catch (e) {
    console.error(e.stack);
    throw (e.stack);
  }
  client.close();
}

exports.findAll = findAll;
exports.findById = findById;
exports.findByDate = findByDate;
exports.insertOne = insertOne;
exports.updateOne = updateOne;
