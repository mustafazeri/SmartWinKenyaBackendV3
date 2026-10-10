const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");

router.post("/start", gameController.startGame);
router.post("/answer", gameController.answerQuestion);
router.post("/quit", gameController.quitGame);
router.get("/leaderboard", async (req, res) => {

	    try {

		            const User = require("../models/User");

		            const leaders = await User.find({})
		                .sort({ coins: -1 })
		                .limit(50)
		                .select("username coins");

		            res.json({
				                success: true,
				                leaders
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

});
module.exports = router;

