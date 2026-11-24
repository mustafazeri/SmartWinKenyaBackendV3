const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const SecurityLog =
	require("../models/SecurityLog");
const User = require("../models/User");
const Notification = require("../models/Notification");
const AdminNotification = require("../models/AdminNotification");
// Register
router.post("/register", async (req, res) => {
    try {

        const {
		    fullName,
		    nationalId,
		    username,
		    password,
		    phone,
		    referralCode
	} = req.body;

        if (
		    !fullName ||
		    !nationalId ||
		    !username ||
		    !password ||
		    !phone
	) {
		    return res.json({
			            success: false,
			            message: "Full name, National ID, username, password and phone number are required."
			        });
	}

        const existing = await User.findOne({ username });

        if (existing) {
            return res.json({
                success: false,
                message: "Username already exists."
            });
        }
const existingPhone = await User.findOne({ phone });

	    if (existingPhone) {
		        return res.json({
				        success: false,
				        message: "Phone number is already registered."
				    });
	    }
const existingId = await User.findOne({
	    nationalId
});

	    if (existingId) {
		        return res.json({
				        success: false,
				        message: "National ID is already registered."
				    });
	    }

        const hashedPassword = await bcrypt.hash(password, 10);

        const myReferralCode =
            username.toUpperCase() +
            Math.floor(1000 + Math.random() * 9000);

        const user = new User({
		    fullName,
		    nationalId: hashedNationalId,
		    username,
		    password: hashedPassword,
		    phone,
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

        
const { username, phone, password } = req.body;

	    let user = await User.findOne({
		        username
	    });

	    if (!user) {
		        return res.json({
				        success: false,
				        message: "User not found."
				    });
	    }

	    if (!user.isAdmin) {

		        if (!phone || user.phone !== phone) {

				        return res.json({
						            success: false,
						            message: "Incorrect phone number."
						        });

				    }

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

router.post("/resetPassword", async (req, res) => {

	    try {

		            const {
				                username,
				                phone,
				                nationalId,
				                newPassword
				            } = req.body;

		            if (
				                !username ||
				                !phone ||
				                !nationalId ||
				                !newPassword
				            ) {
				                return res.json({
							                success: false,
							                message: "Please fill in all fields."
							            });
				            }

		            const user = await User.findOne({
				                username
				            });

		            if (!user) {
				                return res.json({
							                success: false,
							                message: "The information provided does not match our records."
							            });
				            }
		    if (
			        user.resetLockedUntil &&
			        user.resetLockedUntil > new Date()
		    ) {
			        return res.json({
					        success: false,
					        message: "Too many failed attempts. Please try again later."
					    });
		    }

		            const idMatches =
			        await bcrypt.compare(
					        nationalId,
					        user.nationalId
					    );

		    if (
			        user.phone !== phone ||
			        !idMatches
		    ) {

			        user.failedResetAttempts += 1;

			        if (
					    (user.resetLockLevel === 0 && user.failedResetAttempts >= 5) ||
					    (user.resetLockLevel > 0 && user.failedResetAttempts >= 3)
				) {

					    let lockTime;

					    if (user.resetLockLevel === 0) {

						            lockTime = 15 * 60 * 1000;
						            user.resetLockLevel = 1;

						        } else if (user.resetLockLevel === 1) {

								        lockTime = 60 * 60 * 1000;
								        user.resetLockLevel = 2;

								    } else if (user.resetLockLevel === 2) {

									            lockTime = 24 * 60 * 60 * 1000;
									            user.resetLockLevel = 3;

									        } else {

											        return res.json({
													            success: false,
													            message: "Password reset has been permanently locked. Please contact SmartWin Kenya support."
													        });

											    }

					    user.failedResetAttempts = 0;

					    user.resetLockedUntil =
						        new Date(Date.now() + lockTime);
					await SecurityLog.create({
						    username: user.username,
						    event: "Password Reset Locked",
						    description: "Account locked after repeated failed password reset attempts."
					});

				}
			    let lockMessage;

			    if (user.resetLockLevel === 1) {
				        lockMessage = "15 minutes";
			    } else if (user.resetLockLevel === 2) {
				        lockMessage = "1 hour";
			    } else {
				        lockMessage = "24 hours";
			    }

			    await Notification.create({
				        username: user.username,
				        title: "🚨 Security Alert",
				        message: `Your account has been temporarily locked for ${lockMessage} after multiple failed password reset attempts. If this wasn't you, contact SmartWin Kenya support immediately.`,
				        type: "security",
				        action: "login",
				        read: false
			    });

			        await user.save();

				                return res.json({
							                success: false,
							                message: "The information provided does not match our records."
							            });
				            }

		            const hashedPassword =
			                await bcrypt.hash(newPassword, 10);

		            user.password = hashedPassword;

	user.failedResetAttempts = 0;
	user.resetLockedUntil = null;
	user.resetLockLevel = 0;
		         
	await user.save();
		    await SecurityLog.create({
			        username: user.username,
			        event: "Password Reset",
			        description: "Password was successfully reset."
		    });

		    await Notification.create({
			        username: user.username,
			        title: "🔒 Password Changed",
			        message: "Your password was changed successfully.",
			        type: "passwordReset",
			        action: "login",
			        read: false
		    });
		    await AdminNotification.create({
			        title: "🔒 Password Reset",
			        message: `${user.username} reset their password.`,
			        type: "passwordReset",
			        action: "userManagement",
			        read: false
		    });
		            res.json({
				                success: true,
				                message: "Password reset successful."
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
