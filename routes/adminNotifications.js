const express = require("express");
const router = express.Router();

const AdminNotification = require("../models/AdminNotification");
const User = require("../models/User");

// Check admin
 async function checkAdmin(req, res) {

     const username = req.headers.username;

         const admin = await User.findOne({
                 username,
                         isAdmin: true
                            });

                                if (!admin) {
                                         res.json({
                                                    success: false,
                                                                 message: "Unauthorized."
                                                                        });
                                                                                 return null;
                                                                                   }

                                                                                         return admin;
                                                                                        }

                                                                                         // Get all admin notifications
                                                                                        router.get("/", async (req, res) => {

                                                                                             const admin = await checkAdmin(req, res);
                                                                                                 if (!admin) return;

                                                                                                     const notifications = await AdminNotification.find()
                                                                                                             .sort({ createdAt: -1 });

                                                                                                                 res.json({
                                                                                                                         success: true,
                                                                                                                                 notifications

});

                                                                                                                                    });

                                                                                                                                    module.exports = router;
