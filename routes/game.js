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
router.get("/myrank/:username", async (req, res) => {

	    try {

		            const User = require("../models/User");

		            const users = await User.find({})
		                .sort({ coins: -1 });

		            const index = users.findIndex(
				                user => user.username === req.params.username
				            );

		            if (index === -1) {
				                return res.json({
							                success: false,
							                message: "User not found."
							            });
				            }

		            const user = users[index];

		            res.json({
				                success: true,
				                rank: index + 1,
				                username: user.username,
				                coins: user.coins,
				                score: user.score || 0
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

