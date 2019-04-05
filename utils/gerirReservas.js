const Reservas = require("../utils/DB");
const VALOR_POR_HORA = 30.00;

const criarReserva = async (req) => {
  let novaReserva = {
    inicioEm: new Date(req.inicioEm),
    fimEm: new Date(req.fimEm),
    status: "ativa",
    criadoEm: new Date()
  };



  if (req.tipo) {
    if ((req.tipo != "SAIBRO") && (req.tipo != "HARD")) {
      throw {
        error: {
          message: "Tipo de Quadra não existente.",
          code: "TIPO_INEXISTENTE"
        }
      };
    }
  }


  if (novaReserva.inicioEm && novaReserva.fimEm) {
    if (novaReserva.inicioEm == "Invalid Date" && novaReserva.fimEm == "Invalid Date") {
      throw {
        error: {
          message: "Formato de Data Inválido.",
          code: "DATA_INVALIDA"
        }
      };
    }

    novaReserva = valorReserva(novaReserva);

    let check = await checarRange(req);

    if (!check) {
      throw {
        error: {
          message: "O horário solicitado não está disponível, favor selecione um outro horário.",
          code: "HORARIO_INDISPONIVEL"
        }
      };
    }

    if (!tempoReserva(novaReserva)) {
      throw {
        error: {
          message: "O horário solicitado não é valido, favor selecione horas inteiras.",
          code: "HORARIO_INVALIDO"
        }
      };
    }
  }

  return valorReserva(Object.assign(req, novaReserva));
}

const cancelarReserva = () => {
  let cancelamento = {
    status: "cancelada",
    canceladaEm: new Date()
  };

  return cancelamento;
}

const checarReserva = (reserva) => {
  if (reserva.tipo) {
    if ((reserva.tipo != "SAIBRO") && (reserva.tipo != "HARD")) {
      return false;
    }
  }

  if (reserva.inicioEm && reserva.fimEm) {
    reserva = valorReserva(reserva);


    if (!checarRange(reserva)) {
      throw {
        error: {
          message: "O horário solicitado não está disponível, favor selecione um outro horário.",
          code: "HORARIO_INDISPONIVEL"
        }
      };
    }

    if (!tempoReserva(reserva)) {
      throw {
        error: {
          message: "O horário solicitado não é valido, favor selecione horas inteiras.",
          code: "HORARIO_INVALIDO"
        }
      };
    }
  }

  if (reserva.status) {
    if (reserva.status != "ativo" && reserva.status != "cancelado" && reserva.status != "pago") {
      return false;
    }
  }

  return reserva;
}

const checarRange = async (reserva) => {
  let a = await Reservas.findByDate(reserva);

  console.log(a.length);
  if (a.length < 1) {
    return true;
  } else {
    return false;
  }
}

const valorReserva = (reserva) => {
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