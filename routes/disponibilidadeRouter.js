const express = require("express");
const router = express.Router();
const disponibilidadeService = require("../services/disponibilidadeService");

router.post("/disponibilidade", disponibilidadeService.postDisponibilidade);

module.exports = router;
