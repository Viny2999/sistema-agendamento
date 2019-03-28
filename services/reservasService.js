const Reservas = require("../utils/DB");
const gerirReservas = require("../utils/gerirReservas");

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
    const retorno = gerirReservas.criarReserva(req.body);

    // try {
    //   let result = await Reservas.insertOne(retorno);
    //   res.send(result);
    // } catch (e) {
    //   res.status(500);
    //   res.send(e);
    // }

  } catch (e) {
    res.status(422);
    res.send();
  }
};

const putReserva = async (req, res) => {
  let update = req.body
  if (gerirReservas.checarReserva(update) != false) {
    try {
      let result = await Reservas.updateOne(req.params.id, update);
      res.send(result);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(400);
    res.send();
  }
};

const deleteReserva = async (req, res) => {
  let cancelar = gerirReservas.cancelarReserva();

  try {
    let result = await Reservas.updateOne(req.params.id, cancelar);
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
