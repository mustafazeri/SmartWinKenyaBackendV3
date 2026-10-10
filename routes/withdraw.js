const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal");

router.post("/", async (req, res) => {

    try {

        const { username, phone, coins } = req.body;

        if (!username || !phone || !coins) {
            return res.json({
                success: false,
                message: "Please fill all fields."
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            });
        }

        if (user.coins < Number(coins)) {
            return res.json({
                success: false,
                message: "Not enough coins."
            });
        }

        // 1 coin = 1 KSh
        const amount = Number(coins);

        user.coins -= Number(coins);
        user.totalWithdrawn += amount;

        await user.save();

        await Withdrawal.create({
            username,
            phone,
            coins: Number(coins),
            amount,
            status: "Pending"
        });

        res.json({
            success: true,
            message: "Withdrawal request submitted."
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
