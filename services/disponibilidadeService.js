const Reservas = require("../utils/DB");
const gerirReservas = require("../utils/gerirReservas");
const Erro = require("../utils/erros");

const getDisponibilidade = (req, res) => {};

const postDisponibilidade = async (req, res) => {
	let reserva = req.body;

	if (await gerirReservas.checarReservasExistentes(reserva)) {
		reserva = gerirReservas.duracaoValorReserva(reserva);
		res.send(reserva);
	} else {
		let opcoes = await gerirReservas.reservasSemelhantes(reserva);
		res.send(opcoes);
	}
};

exports.getDisponibilidade = getDisponibilidade;
exports.postDisponibilidade = postDisponibilidade;
