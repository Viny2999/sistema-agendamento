const gerirReservas = require("../utils/gerirReservas");

const reservasSemelhantes = async reserva => {
	let retorno = [];

	retorno.push(await tipoDiferente(reserva));

	retorno.push(await umaHoraAntes(reserva));

	retorno.push(await umaHoraDepois(reserva));

	retorno.push(await tipoDiferentUmaHoraAntes(reserva));

	retorno.push(await tipoDiferentUmaHoraDepois(reserva));

	retorno.push(await duasHoraAntes(reserva));

	retorno.push(await duasHoraDepois(reserva));

	return retorno;
};

const tipoDiferente = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}

	if (mock.tipo == "SAIBRO") {
		mock.tipo = "HARD";
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	} else {
		mock.tipo = "SAIBRO";
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	}
};

const tipoDiferentUmaHoraAntes = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataInicio = new Date(mock.inicioEm);
	let horaAntes = {
		inicioEm: new Date(dataInicio.getTime() - 3600000),
		fimEm: dataInicio
	};

	if (mock.tipo == "SAIBRO") {
		mock.tipo = "HARD";
		mock.inicioEm = horaAntes.inicioEm;
		mock.fimEm = horaAntes.fimEm;
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	} else {
		mock.tipo = "SAIBRO";
		mock.inicioEm = horaAntes.inicioEm;
		mock.fimEm = horaAntes.fimEm;
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	}
};

const tipoDiferentUmaHoraDepois = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataFim = new Date(mock.fimEm);
	let horaDepois = {
		inicioEm: dataFim,
		fimEm: new Date(dataFim.getTime() + 3600000)
	};

	if (mock.tipo == "SAIBRO") {
		mock.tipo = "HARD";
		mock.inicioEm = horaDepois.inicioEm;
		mock.fimEm = horaDepois.fimEm;
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	} else {
		mock.tipo = "SAIBRO";
		mock.inicioEm = horaDepois.inicioEm;
		mock.fimEm = horaDepois.fimEm;
		if (await gerirReservas.checarReservasExistentes(mock)) {
			mock = gerirReservas.duracaoValorReserva(mock);
			return mock;
		} else return "";
	}
};

const umaHoraAntes = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataInicio = new Date(mock.inicioEm);
	let horaAntes = {
		inicioEm: new Date(dataInicio.getTime() - 3600000),
		fimEm: dataInicio
	};

	mock.inicioEm = horaAntes.inicioEm;
	mock.fimEm = horaAntes.fimEm;
	if (await gerirReservas.checarReservasExistentes(mock)) {
		mock = gerirReservas.duracaoValorReserva(mock);
		return mock;
	} else return "";
};

const umaHoraDepois = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataFim = new Date(mock.fimEm);
	let horaDepois = {
		inicioEm: dataFim,
		fimEm: new Date(dataFim.getTime() + 3600000)
	};

	mock.inicioEm = horaDepois.inicioEm;
	mock.fimEm = horaDepois.fimEm;
	if (await gerirReservas.checarReservasExistentes(mock)) {
		mock = gerirReservas.duracaoValorReserva(mock);
		return mock;
	} else return "";
};

const duasHoraAntes = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataInicio = new Date(reserva.inicioEm);
	let duasHorasAntes = {
		inicioEm: new Date(dataInicio.getTime() - 7200000),
		fimEm: new Date(dataInicio.getTime() - 3600000)
	};

	mock.inicioEm = duasHorasAntes.inicioEm;
	mock.fimEm = duasHorasAntes.fimEm;
	if (await gerirReservas.checarReservasExistentes(mock)) {
		mock = gerirReservas.duracaoValorReserva(mock);
		return mock;
	} else return "";
};

const duasHoraDepois = async reserva => {
	let mock = {
		tipo: reserva.tipo,
		inicioEm: reserva.inicioEm,
		fimEm: reserva.fimEm
	}
	let dataFim = new Date(reserva.fimEm);
	let duasHorasDepois = {
		inicioEm: new Date(dataFim.getTime() + 7200000),
		fimEm: new Date(dataFim.getTime() + 10800000)
	};

	mock.inicioEm = duasHorasDepois.inicioEm;
	mock.fimEm = duasHorasDepois.fimEm;
	if (await gerirReservas.checarReservasExistentes(mock)) {
		mock = gerirReservas.duracaoValorReserva(mock);
		return mock;
	} else return "";
};

exports.reservasSemelhantes = reservasSemelhantes;
