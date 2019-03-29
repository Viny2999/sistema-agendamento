const valorPorHora = 30.00;

const criarReserva = (req) => {
  let novaReserva = {
    inicioEm: new Date(req.inicioEm),
    fimEm: new Date(req.fimEm),
    status: "ativa",
    criadoEm: new Date()
  };

  if (req.tipo) {
    if ((req.tipo != "SAIBRO") && (req.tipo != "HARD")) {
      throw e;
    }
  }

  if (!tempoReserva(req)) {
    throw e;
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
    if (reserva.tipo != "SAIBRO" || reserva.tipo != "HARD") {
      return false;
    }
  }

  if (reserva.inicioEm && reserva.fimEm) {
    reserva = valorReserva(reserva);

    // if (!checarRange(reserva)) {
    //   throw {
    //     error: {
    //       message: "O horário solicitado não está disponível, favor selecione um outro horário.",
    //       code: "HORARIO_INDISPONIVEL"
    //     }
    //   };
    // }

    checarRange(reserva);

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
    if (reserva.status != "ativo" || reserva.status != "cancelado" || reserva.status != "pago") {
      return false;
    }
  }

  return reserva;
}

const checarRange = (reserva) => {
  let dataInicio = new Date(reserva.inicioEm);
  let dataFim = new Date(reserva.fimEm);



  console.log(dataInicio, dataFim);
}

const valorReserva = (reserva) => {
  let minutes = calcularMinutos(reserva);

  let valor = minutes / 60;
  valorTotal = valorPorHora * valor;
  let valores = {
    duracao: minutes,
    valor: valorTotal
  }

  return Object.assign(reserva, valores)
}

const tempoReserva = (reserva) => {
  let minutes = calcularMinutos(reserva);

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