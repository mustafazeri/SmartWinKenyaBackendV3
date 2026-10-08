const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Payment = require("../models/Payment");

router.get("/stats", async (req, res) => {
	    try {

		            const users = await User.countDocuments();

		            const deposits = await Payment.aggregate([
				                {
							                $match: {
										                    status: "Completed"
										                }
							            },
				                {
							                $group: {
										                    _id: null,
										                    total: {
													                            $sum: "$amount"
													                        }
										                }
							            }
				            ]);

		            const coins = await User.aggregate([
				                {
							                $group: {
										                    _id: null,
										                    total: {
													                            $sum: "$coins"
													                        }
										                }
							            }
				            ]);

		            res.json({
				                success: true,
				                users,
				                deposits: deposits[0]?.total || 0,
				                totalCoins: coins[0]?.total || 0
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false
						        });

				    }
});

module.exports = router;
