const request = require("supertest");
const app = require("../app");

/**
 * Testando endpoint de checagem de disponibilidade de reservas
 */
describe("POST /disponibilidade", () => {
	let data = {
		tipo: "HARD",
		inicioEm: "2019-01-01T19:00:00.000Z",
		fimEm: "2019-01-01T20:00:00.000Z"
	};
	it("Respondeu com 200 para checagem de disponibilidade de reservas", done => {
		request(app)
			.post("/disponibilidade")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done)
	});
});