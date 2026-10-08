require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Payment = require("./models/Payment");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const depositRoutes = require("./routes/deposit");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/deposit", depositRoutes);
app.post("/callback", async (req, res) => {
	        console.log("========== MPESA CALLBACK ==========");
    console.log(JSON.stringify(req.body, null, 2));

    try {
            const callback = req.body.Body.stkCallback;

            if (callback.ResultCode === 0) {
	                const checkoutRequestID = callback.CheckoutRequestID;

	                const payment = await Payment.findOne({
			                checkoutRequestID: checkoutRequestID
			            });

	                if (payment && payment.status !== "Completed") {
			                payment.status = "Completed";
			                await payment.save();

			                const user = await User.findOne({
					                    username: payment.username
					                });

			                if (user) {
					                    user.coins += payment.amount;
					                    await user.save();

					                    console.log(
					                        `✅ ${payment.amount} coins added to ${user.username}`
					                    );
					                }
			            }
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
	    console.log(err);
});
