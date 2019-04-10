const Reservas = require("../utils/DB");
const ERRO = require("./erros");
const VALOR_POR_HORA = 30.0;

const criarReserva = async reserva => {
	let novaReserva = {
		inicioEm: new Date(reserva.inicioEm),
		fimEm: new Date(reserva.fimEm),
		status: "ativa",
		criadoEm: new Date()
	};

	if (reserva.tipo) {
		if (reserva.tipo != "SAIBRO" && reserva.tipo != "HARD") {
			throw ERRO.TIPO_INEXISTENTE;
		}
	} else {
		throw ERRO.TIPO_NAO_INSERIDO;
	}

	if (reserva.inicioEm && reserva.fimEm) {
		if (
			novaReserva.inicioEm == "Invalid Date" &&
			novaReserva.fimEm == "Invalid Date"
		) {
			throw ERRO.DATA_INVALIDA;
		}

		novaReserva = duracaoValorReserva(novaReserva);

		const check = await checarReservasExistentes(reserva);

		if (!check) {
			throw ERRO.HORARIO_INDISPONIVEL;
		}

		if (!tempoReserva(novaReserva)) {
			throw ERRO.HORARIO_INVALIDO;
		}
	} else {
		throw ERRO.HORARIO_NAO_INSERIDO;
	}

	return duracaoValorReserva(Object.assign(reserva, novaReserva));
};

const atualizarReserva = async reserva => {
	if (reserva.criadoEm && reserva.valor && reserva.duracao) {
		throw ERRO.ATUALIZACAO_NAO_PERMITIDA;
	}

	if (reserva.tipo) {
		if (reserva.tipo != "SAIBRO" && reserva.tipo != "HARD") {
			throw ERRO.TIPO_INEXISTENTE;
		}
	}

	if (reserva.inicioEm && reserva.fimEm) {
		reserva = duracaoValorReserva(reserva);

		const check = await checarReservasExistentes(reserva);

		if (!check) {
			throw ERRO.HORARIO_INDISPONIVEL;
		}

		if (!tempoReserva(novaReserva)) {
			throw ERRO.HORARIO_INVALIDO;
		}
	}

	if (reserva.status) {
		if (
			reserva.status != "ativo" &&
			reserva.status != "cancelado" &&
			reserva.status != "pago"
		) {
			return false;
		}
	}

	return reserva;
};

const cancelarReserva = () => {
	let cancelamento = {
		status: "cancelada",
		canceladaEm: new Date()
	};

	return cancelamento;
};

const checarReservasExistentes = async reserva => {
	let reservasExistentes = await Reservas.findByDate(reserva);

	if (reservasExistentes.length < 1) {
		return true;
	} else {
		return false;
	}
};

const duracaoValorReserva = reserva => {
	let minutes = calcularMinutos(reserva);

	let valor = minutes / 60;
	valorTotal = VALOR_POR_HORA * valor;
	let valores = {
		duracao: minutes,
		valor: valorTotal
	};

	return Object.assign(reserva, valores);
};

const tempoReserva = reserva => {
	const minutes = calcularMinutos(reserva);

	if (minutes % 60 == 0) {
		return true;
	} else {
		return false;
	}
};

const calcularMinutos = reserva => {
	let dataInicio = new Date(reserva.inicioEm);
	let dataFim = new Date(reserva.fimEm);
	let diffMs = dataFim - dataInicio;

	return Math.floor(diffMs / 60000);
};

exports.criarReserva = criarReserva;
exports.atualizarReserva = atualizarReserva;
exports.cancelarReserva = cancelarReserva;

exports.checarReservasExistentes = checarReservasExistentes;
exports.duracaoValorReserva = duracaoValorReserva;
