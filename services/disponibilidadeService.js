const gerirReservas = require("../utils/gerirReservas");
const gerirDisponibildades = require("../utils/gerirDisponibildades");

const getDisponibilidade = (req, res) => {};

const postDisponibilidade = async (req, res) => {
	let reserva = req.body;

	if (await gerirReservas.checarReservasExistentes(reserva)) {
		reserva = gerirReservas.duracaoValorReserva(reserva);
		res.send(reserva);
	} else {
		let opcoes = await gerirDisponibildades.reservasSemelhantes(reserva);
		res.send(opcoes);
	}
};

exports.getDisponibilidade = getDisponibilidade;
exports.postDisponibilidade = postDisponibilidade;
