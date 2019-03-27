const express = require("express");
const router = express.Router();
const reservasService = require("../services/reservasService");

router.get("/reservas", reservasService.getAllReserva);
router.get("/reservas/:id", reservasService.getOneReserva);
router.post("/reservas", reservasService.postReserva);
router.put("/reservas/:id", reservasService.putReserva);
router.delete("/reservas/:id", reservasService.deleteReserva);

module.exports = router;
