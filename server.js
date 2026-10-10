require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Payment = require("./models/Payment");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const gameRoutes = require("./routes/game");
const depositRoutes = require("./routes/deposit");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/game", gameRoutes);
app.use("/deposit", depositRoutes);

app.get("/mpesa/history/:username", async (req, res) => {

	    try {

		            const payments = await Payment.find({
				                username: req.params.username
				            }).sort({ createdAt: -1 });

		            res.json({
				                success: true,
				                payments
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Could not load deposit history."
						        });

				    }

});
app.post("/callback", async (req, res) => {

	    console.log("========== MPESA CALLBACK ==========");
	    console.log(JSON.stringify(req.body, null, 2));

	    try {

		            const callback = req.body.Body.stkCallback;

		         const checkoutRequestID = callback.CheckoutRequestID;

		    const payment = await Payment.findOne({
			        checkoutRequestID
		    });

		    if (!payment) {
			        return res.json({
					        ResultCode: 0,
					        ResultDesc: "Accepted"
					    });
		    }
		    if (callback.ResultCode === 0) {

				                const checkoutRequestID = callback.CheckoutRequestID;

				                const callbackItems = callback.CallbackMetadata.Item || [];

				                let receipt = "";

				                callbackItems.forEach(item => {
							                if (item.Name === "MpesaReceiptNumber") {
										                    receipt = item.Value;
										                }
							            });

				                const payment = await Payment.findOne({
							                checkoutRequestID
							            });

				                if (payment && payment.status !== "Completed") {

							                payment.status = "Completed";
							                payment.mpesaReceipt = receipt;

							                await payment.save();
							console.log("Receipt saved:", payment.mpesaReceipt);

							                const user = await User.findOne({
										                    username: payment.username
										                });

							                if (user) {

										                    user.coins += payment.amount;

										                    await user.save();

										                    console.log(`✅ ${payment.amount} coins added to ${user.username}`);

										                }

							            }

				                                                        }
		                                                else {
									                                                payment.status = "Failed";
									                                                await payment.save();

									                                                console.log(
																                                                    `❌ Payment failed for ${payment.username}. ResultCode: ${callback.ResultCode}`
																                                                );
									                                            }

		                                return res.json({
				                ResultCode: 0,
				                ResultDesc: "Accepted"
				            });

		        } catch (err) {

				        console.error(err);

				        return res.json({
						            ResultCode: 0,
						            ResultDesc: "Accepted"
						        });

				    }

});
app.get("/", (req, res) => {

	    res.json({
		            success: true,
		            app: "SmartWin Kenya V3",
		            status: "Running"
		        });

});

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {

	    console.log("✅ MongoDB Connected");

	    app.listen(PORT, () => {

		            console.log(`🚀 Server running on port ${PORT}`);

		        });

})
.catch(err => {

	    console.error("MongoDB Error:", err);

});
