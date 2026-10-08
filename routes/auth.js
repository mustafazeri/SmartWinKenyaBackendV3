const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    try {

        const { username, password, referralCode } = req.body;

        if (!username || !password) {
            return res.json({
                success: false,
                message: "Username and password are required."
            });
        }

        const existing = await User.findOne({ username });

        if (existing) {
            return res.json({
                success: false,
                message: "Username already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const myReferralCode =
            username.toUpperCase() +
            Math.floor(1000 + Math.random() * 9000);

        const user = new User({
            username,
            password: hashedPassword,
            referralCode: myReferralCode,
            coins: 0,
            score: 0,
            referredBy: referralCode || null
        });

        await user.save();

        res.json({
            success: true,
            message: "Registration successful."
        });

    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            message: "Server error."
        });
    }
});

// Login
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            });
        }

        const ok = await bcrypt.compare(
            password,
            user.password
        );

        if (!ok) {
            return res.json({
                success: false,
                message: "Incorrect password."
            });
        }

        res.json({
            success: true,
            username: user.username,
            coins: user.coins,
            score: user.score,
            isAdmin: user.isAdmin
        });

    } catch (err) {

        console.error(err);

        res.json({
            success: false,
            message: "Server error."
        });

    }

});
// Get referral code
 router.get("/referral/:username", async (req, res) => {
   try {           const user = await User.findOne({
                       username: req.params.username
                              });
                                      if (!user) {                                                    return res.json({
                                                                   success: false,
                                                                                  message: "User not found."
                                                                                               });
                                                                                                        }
                                                                                                                res.json({                                                                                                                             success: true,
                                                                                                                                        referralCode: user.referralCode
                                                                                                                                               });
                                                                                                                                                    } catch (err) {
                                                                                                                                                            res.json({
                                                                                                                                                                         success: false,
                                                                                                                                                                                    message: "Server error."
                                                                                                                                                                                            });
                                                                                                                                                                                               }
                                                                                                                                                                                               });

module.exports = router;
