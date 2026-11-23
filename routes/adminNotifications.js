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
router.delete("/:id", async (req, res) => {

	    const admin = await checkAdmin(req, res);
	    if(!admin) return;

	    try{

		            await AdminNotification.findByIdAndDelete(
				                req.params.id
				            );

		            res.json({
				                success:true
				            });

		        }catch(err){

				        console.error(err);

				        res.json({
						            success:false,
						            message:"Server error."
						        });

				    }

});
                                                                                                                                    module.exports = router;
