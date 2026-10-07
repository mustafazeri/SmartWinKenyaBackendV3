const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");

router.post("/start", gameController.startGame);
router.post("/answer", gameController.answerQuestion);
router.post("/quit", gameController.quitGame);
module.exports = router;
