const valorPorHora = 30.00;

const criarReserva = (req) => {
  let novaReserva = {
    status: "ativa",
    criadoEm: new Date()
  };

  return valorReserva(Object.assign(req, novaReserva));
}

const cancelarReserva = () => {
  let cancelamento = {
    status: "cancelada",
    canceladaEm: new Date()
  };

  return cancelamento;
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

exports.criarReserva = criarReserva;
exports.valorReserva = valorReserva;
exports.cancelarReserva = cancelarReserva;