const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

router.get("/:username", async (req, res) => {

	    try {

		            const notifications = await Notification.find({
				                username: req.params.username
				            }).sort({
						                createdAt: -1
						            });

		            res.json({
				                success: true,
				                notifications
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

});
router.post("/markRead/:username", async (req, res) => {

	    try {

		            await Notification.updateMany(
				                {
							                username: req.params.username,
							                read: false
							            },
				                {
							                $set: {
										                    read: true
										                }
							            }
				            );

		            res.json({
				                success: true
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

});
router.delete("/:id", async (req, res) => {

	    try {

		            await Notification.findByIdAndDelete(req.params.id);

		            res.json({
				                success: true
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
