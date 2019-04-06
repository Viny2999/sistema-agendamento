const Reservas = require("../utils/DB");
const gerirReservas = require("../utils/gerirReservas");
const Erro = require("../utils/erros");

const getDisponibilidade = (req, res) => {

}

const postDisponibilidade = async (req, res) => {
  let reserva = req.body;

  if (await gerirReservas.checarRange(reserva)) {
    reserva = gerirReservas.duracaoValorReserva(reserva);
    res.send(reserva);
  } else {
    let opcoes = await gerirReservas.reservasSemelhantes(reserva);
  }

}

exports.getDisponibilidade = getDisponibilidade;
exports.postDisponibilidade = postDisponibilidade;
