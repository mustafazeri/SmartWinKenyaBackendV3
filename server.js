require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const depositRoutes = require("./routes/deposit");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/deposit", depositRoutes);
app.post("/callback", (req, res) => {
	    console.log("========== MPESA CALLBACK ==========");
	    console.log(JSON.stringify(req.body, null, 2));

	    res.status(200).json({
		            ResultCode: 0,
		            ResultDesc: "Accepted"
		        });
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
