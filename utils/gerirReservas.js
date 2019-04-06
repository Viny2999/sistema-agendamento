const Reservas = require("../utils/DB");
const Erro = require("./erros");
const VALOR_POR_HORA = 30.00;

const criarReserva = async (reserva) => {
  let novaReserva = {
    inicioEm: new Date(reserva.inicioEm),
    fimEm: new Date(reserva.fimEm),
    status: "ativa",
    criadoEm: new Date()
  };

  if (reserva.tipo) {
    if ((reserva.tipo != "SAIBRO") && (reserva.tipo != "HARD")) {
      throw Erro.TIPO_INEXISTENTE;
    };
  } else {
    throw Erro.TIPO_NAO_INSERIDO
  };



  if (reserva.inicioEm && reserva.fimEm) {
    if (novaReserva.inicioEm == "Invalid Date" && novaReserva.fimEm == "Invalid Date") {
      throw Erro.DATA_INVALIDA;
    }

    novaReserva = duracaoValorReserva(novaReserva);

    const check = await checarRange(reserva);

    if (!check) {
      throw Erro.HORARIO_INDISPONIVEL;
    }

    if (!tempoReserva(novaReserva)) {
      throw Erro.HORARIO_INVALIDO;
    }
  } else {
    throw Erro.HORARIO_NAO_INSERIDO;
  }

  return duracaoValorReserva(Object.assign(reserva, novaReserva));
}

const cancelarReserva = () => {
  let cancelamento = {
    status: "cancelada",
    canceladaEm: new Date()
  };

  return cancelamento;
}

const checarReserva = async (reserva) => {
  if (reserva.tipo) {
    if ((reserva.tipo != "SAIBRO") && (reserva.tipo != "HARD")) {
      throw Erro.TIPO_INEXISTENTE;
    }
  } else {
    throw Erro.TIPO_NAO_INSERIDO
  };

  if (reserva.inicioEm && reserva.fimEm) {
    reserva = duracaoValorReserva(reserva);

    const check = await checarRange(reserva);

    if (!check) {
      throw Erro.HORARIO_INDISPONIVEL;
    }

    if (!tempoReserva(novaReserva)) {
      throw Erro.HORARIO_INVALIDO;
    }
  } else {
    throw Erro.HORARIO_NAO_INSERIDO;
  }

  if (reserva.status) {
    if (reserva.status != "ativo" && reserva.status != "cancelado" && reserva.status != "pago") {
      return false;
    }
  }

  return reserva;
}

const checarRange = async (reserva) => {
  let reservasExistentes = await Reservas.findByDate(reserva);

  if (reservasExistentes.length < 1) {
    return true;
  } else {
    return false;
  }
}

const duracaoValorReserva = (reserva) => {
  let minutes = calcularMinutos(reserva);

  let valor = minutes / 60;
  valorTotal = VALOR_POR_HORA * valor;
  let valores = {
    duracao: minutes,
    valor: valorTotal
  }

  return Object.assign(reserva, valores)
}

const tempoReserva = (reserva) => {
  const minutes = calcularMinutos(reserva);

  if (minutes % 60 == 0) {
    return true;
  } else {
    return false;
  }
}

const calcularMinutos = (reserva) => {
  let dataInicio = new Date(reserva.inicioEm);
  let dataFim = new Date(reserva.fimEm);
  let diffMs = dataFim - dataInicio;

  return Math.floor(diffMs / 60000);
}

exports.criarReserva = criarReserva;
exports.checarReserva = checarReserva;
exports.cancelarReserva = cancelarReserva;

exports.checarRange = checarRange;
exports.duracaoValorReserva = duracaoValorReserva;