const Reservas = require("../utils/DB");

const getDisponibilidade = (req, res) => {

}

const postDisponibilidade = (req, res) => {
  console.log(req.body);
  res.send(req.body)
}

exports.getDisponibilidade = getDisponibilidade;
exports.postDisponibilidade = postDisponibilidade;
