const express = require("express");
const router = express.Router();

const aiQuestionController = require("../controllers/aiQuestionController");

router.post(
	    "/generateQuestions",
	    aiQuestionController.generateQuestions
);

module.exports = router;
