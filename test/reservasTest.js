const Reservas = require("../utils/DB");
const ERRO = require("../utils/erros");
const request = require("supertest");
const app = require("../app");

/**
 * Testando endpoint de todas reservas
 */
describe("GET /reservas", () => {
	it("Respondeu 200 com um json contendo uma lista de todas as reservas", done => {
		request(app)
			.get("/reservas")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testando endpoint de uma reserva especifica
 */
describe("GET /reservas/:id", () => {
	it("Respondeu 200 com um json contendo uma unica reserva", done => {
		request(app)
			.get("/reservas/5ca7b1fb498c8e59ac0109fa")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testando endpoint de criacao de reserva
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARD",
		inicioEm: "2016-01-01T19:00:00Z",
		fimEm: "2016-01-01T20:00:00Z"
	};
	it("Respondeu com 200 para a criação de reservas", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then(async response => {
				await Reservas.deleteOne(response.body._id);
				done();
			});
	});
});

/**
 * Testando endpoint de update de reserva
 */
describe("PUT /reservas/:id", () => {
	let data = {
		tipo: "HARD"
	};
	it("Respondeu com 200 para o update de reservas", done => {
		request(app)
			.put("/reservas/5cace9e294686e051bb8e1dd")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testando endpoint de cancelamento de reserva
 */
describe("DELETE /reserva/:id", () => {
	it("Respondeu com 200 para o cancelamento de reservas", done => {
		request(app)
			.delete("/reservas/5cad65e7b59f791ee50cc1c1")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testando endpoint de criacao de reserva (com data existente)
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARD",
		inicioEm: "2019-01-01T19:00:00Z",
		fimEm: "2019-01-01T20:00:00Z"
	};
	it("Respondeu com 422 para a criação de reservas datas existentes", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.HORARIO_INDISPONIVEL)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testando endpoint de criacao de reserva (com tipo de quadra inexistente)
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARDA",
		inicioEm: "2019-01-01T19:00:00Z",
		fimEm: "2019-01-01T20:00:00Z"
	};
	it("Respondeu com 422 para a criação de reservas com tipo de quadra inexistente", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.TIPO_INEXISTENTE)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testando endpoint de criacao de reserva (com data invalida)
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARD",
		inicioEm: "kk",
		fimEm: "kk"
	};
	it("Respondeu com 422 para a criação de reservas com data invalida", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.DATA_INVALIDA)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testando endpoint de criacao de reserva (com horario quebrado)
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARD",
		inicioEm: "2019-01-01T19:10:00Z",
		fimEm: "2019-01-01T20:00:00Z"
	};
	it("Respondeu com 422 para a criação de reservas com horario quebrado", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.HORARIO_INVALIDO)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testando endpoint de criacao de reserva (sem tipo de quadra)
 */
describe("POST /reservas", () => {
	let data = {
		inicioEm: "2019-01-01T19:10:00Z",
		fimEm: "2019-01-01T20:00:00Z"
	};
	it("Respondeu com 422 para a criação de reservas sem tipo de quadra", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.TIPO_NAO_INSERIDO)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testando endpoint de criacao de reserva (sem horario)
 */
describe("POST /reservas", () => {
	let data = {
		tipo: "HARD"
	};
	it("Respondeu com 422 para a criação de reservas sem horario", done => {
		request(app)
			.post("/reservas")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422, ERRO.HORARIO_NAO_INSERIDO)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});
