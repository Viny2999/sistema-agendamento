const express = require("express");
const router = express.Router();
const disponibilidadeService = require("../services/disponibilidadeService");

router.get("/disponibilidade", disponibilidadeService.getDisponibilidade);
router.post("/disponibilidade", disponibilidadeService.postDisponibilidade);

module.exports = router;
