const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Payment = require("../models/Payment");
const Withdrawal = require("../models/Withdrawal");

// Dashboard statistics
router.get("/stats", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDeposits = await Payment.countDocuments({ status: "Completed" });
        const totalWithdrawals = await Withdrawal.countDocuments();
        const completedWithdrawals = await Withdrawal.countDocuments({
            status: "Completed"
        });

        res.json({
            success: true,
            totalUsers,
            totalDeposits,
            totalWithdrawals,
            completedWithdrawals
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Server error."
        });
    }
});

// Deposit history
router.get("/deposits", async (req, res) => {
    try {
        const deposits = await Payment.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            deposits
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Server error."
        });
    }
});
// Withdrawal history
router.get("/withdrawals", async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            withdrawals
        });

    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            message: "Server error."
        });
    }
});

// Approve withdrawal
router.post("/withdraw/approve", async (req, res) => {
    try {

        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({
                success: false,
                message: "Withdrawal not found."
            });
        }

        withdrawal.status = "Completed";
        await withdrawal.save();

        res.json({
            success: true,
            message: "Withdrawal approved."
        });

    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            message: "Server error."
        });
    }
});
// Reject withdrawal
router.post("/withdraw/reject", async (req, res) => {
    try {

        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({
                success: false,
                message: "Withdrawal not found."
            });
        }

        const user = await User.findOne({
            username: withdrawal.username
        });

        if (user) {
            user.coins += withdrawal.coins;
            await user.save();
        }

        withdrawal.status = "Rejected";
        await withdrawal.save();

        res.json({
            success: true,
            message: "Withdrawal rejected and coins refunded."
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
