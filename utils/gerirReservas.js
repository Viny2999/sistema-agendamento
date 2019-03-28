const valorPorHora = 30.00;

const criarReserva = (req) => {
  let novaReserva = {
    status: "ativa",
    criadoEm: new Date()
  };

  if (!tempoReserva) {
    console.log("foi");
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
  if (reserva.inicioEm && reserva.fimEm) {
    reserva = valorReserva(reserva);
  }

  if (reserva.status) {
    if (reserva.status != "ativo" || reserva.status != "cancelado" || reserva.status != "pago") {
      reserva = false;
    }
  }

  return reserva;
}

const valorReserva = (reserva) => {
  let dataInicio = new Date(reserva.inicioEm);
  let dataFim = new Date(reserva.fimEm);
  let diffMs = dataFim - dataInicio;
  let minutes = Math.floor(diffMs / 60000);
  let valor = minutes / 60;
  valorTotal = valorPorHora * valor;
  let valores = {
    duracao: minutes,
    valor: valorTotal
  }

  return Object.assign(reserva, valores)
}

const tempoReserva = (reserva) => {
  let dataInicio = new Date(reserva.inicioEm);
  let dataFim = new Date(reserva.fimEm);
  let diffMs = dataFim - dataInicio;
  let minutes = Math.floor(diffMs / 60000);

  if (minutes % 60 == 0) {
    return true;
  } else {
    return false;
  }
}

exports.criarReserva = criarReserva;
exports.checarReserva = checarReserva;
exports.cancelarReserva = cancelarReserva;