const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Payment = require("../models/Payment");

router.get("/stats", async (req, res) => {
	    try {

		            const totalUsers = await User.countDocuments();

		            const totalCoins = await User.aggregate([
				                {
							                $group: {
										                    _id: null,
										                    total: { $sum: "$coins" }
										                }
							            }
				            ]);

		            const totalDeposits = await Payment.aggregate([
				                {
							                $match: { status: "Completed" }
							            },
				                {
							                $group: {
										                    _id: null,
										                    total: { $sum: "$amount" }
										                }
							            }
				            ]);

		            res.json({
				                success: true,
				                users: totalUsers,
				                coins: totalCoins[0]?.total || 0,
				                deposits: totalDeposits[0]?.total || 0
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }
});

router.get("/payments", async (req, res) => {

	    try {

		            const search = req.query.search || "";

		            let query = {};

		            if (search !== "") {
				                query.username = {
							                $regex: search,
							                $options: "i"
							            };
				            }

		            const payments = await Payment.find(query)
		                .sort({ createdAt: -1 });

		            res.json({
				                success: true,
				                payments
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
