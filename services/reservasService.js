const Reservas = require("../utils/DB");

const getAllReserva = async (req, res) => {
  try {
    let result = await Reservas.findAll();
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

const getOneReserva = async (req, res) => {
  try {
    let result = await Reservas.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

const postReserva = async (req, res) => {
  try {
    let result = await Reservas.insertOne(req.body);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

const putReserva = async (req, res) => {
  try {
    let result = await Reservas.updateOne(req.params.id, req.body);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

const deleteReserva = async (req, res) => {
  try {
    let result = await Reservas.deleteOne(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.getAllReserva = getAllReserva;
exports.getOneReserva = getOneReserva;
exports.postReserva = postReserva;
exports.putReserva = putReserva;
exports.deleteReserva = deleteReserva;
