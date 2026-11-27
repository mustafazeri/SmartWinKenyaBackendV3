const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const GameSession = require("../models/GameSession");
const SecurityLog =
	require("../models/SecurityLog");
const QuizResult = require("../models/QuizResult");
const AdminNotification = require("../models/AdminNotification");
const User = require("../models/User");
const Payment = require("../models/Payment");
const OwnerTransaction = require("../models/OwnerTransaction");
const Withdrawal = require("../models/Withdrawal");
async function checkAdmin(req, res) {

	    const username = req.headers.username;

	    if (!username) {
		            res.json({
				                success: false,
				                message: "Access denied."
				            });
		            return null;
		        }

	    const user = await User.findOne({
		            username
		        });

	    if (!user || !user.isAdmin) {
		            res.json({
				                success: false,
				                message: "Access denied."
				            });
		            return null;
		        }

	    return user;
}

// Dashboard statistics
router.get("/stats", async (req, res) => {
    try {
	    const admin = await checkAdmin(req, res);

	    if (!admin) return;
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
	    const admin = await checkAdmin(req, res);

	    if (!admin) return;
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
	    const admin = await checkAdmin(req, res);

	    if (!admin) return;
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
    try {const admin = await checkAdmin(req, res);

	    if (!admin) return;

        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({
                success: false,
                message: "Withdrawal not found."
            });
        }
	    if (withdrawal.status === "Completed") {
		        return res.json({
				        success: false,
				        message: "This withdrawal has already been approved."
				    });
	    }
await OwnerTransaction.create({
	    type: "Withdrawal",
	    username: withdrawal.username,
	    amount: withdrawal.amount,
	    description: "M-Pesa Withdrawal"
});
	    await Notification.create({
		        username: withdrawal.username,
		        title: "Withdrawal Approved",
		        message: `Your withdrawal of KSh ${withdrawal.amount} has been approved and is being processed.`,
		        read: false
	    });
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
    try {const admin = await checkAdmin(req, res);

	    if (!admin) return;

        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({
                success: false,
                message: "Withdrawal not found."
            });
        }
	    if (withdrawal.status !== "Pending") {
		        return res.json({
				        success: false,
				        message: "This withdrawal has already been processed."
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

	    await Notification.create({
		        username: withdrawal.username,
		        title: "Withdrawal Rejected",
		        message: `Your withdrawal request for KSh ${withdrawal.amount} was rejected. The coins have been returned to your wallet.`,
		        read: false
	    });

    } catch (err) {

        console.error(err);

        res.json({
            success: false,
            message: "Server error."
        });

    }
});
router.post("/addCoins", async (req, res) => {

	    try{

		            const {
				                username,
				                usernames,
				                coins,
				                adminPassword
				            } = req.body;

		            const correctPassword = "JoramZeri@2026Karumia.";

		            if(adminPassword !== correctPassword){

				                return res.json({
							                success:false,
							                message:"Wrong admin password."
							            });

				            }


		             // Bulk add
		          if(Array.isArray(usernames) && usernames.length > 0){
		    
		                       let updated = 0;
		                                 let skipped = 0;
		    
		                                               for(const name of usernames){
		    
		                                                               const user = await User.findOne({
		                                                                                  username:name
		                                                                                                 });
		    
		                                                                                                                    if(!user){
		                                                                                                                                     skipped++;
		                                                                                                                                                       continue;
		                                                                                                                                                                           }
		    
		                                                                                                                                                                                           user.coins += Number(coins);
		    
		                                                                                                                                                                                                          await user.save();
		    
		                                                                                                                                                                                                                          await OwnerTransaction.create({
		    
		                                                                                                                                                                                                                                              type:"Admin Coin Adjustment",
		    
		                                                                                                                                                                                                                                                                   username:name,
		    
		                                                                                                                                                                                                                                                                                      amount:Number(coins),
		
		                                                                                                                                                                                                                                                                                                           description:"Admin added coins",
		    
		                                                                                                                                                                                                                                                                                                                               status:"Completed"
		
		                                                                                                                                                                                                                                                                                                                                              });
		    
		                                                                                                                                                                                                                                                                                                                                                              updated++;
		    
		                                                                                                                                                                                                                                                                                                                                                                          }
		    
		                                                                                                                                                                                                                                                                                                                                                                                      return res.json({
		    
		                                                                                                                                                                                                                                                                                                                                                                                                     success:true,
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                       updated,
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                       skipped
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                 });
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
		    
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // Single user add
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const user = await User.findOne({ username });
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if(!user){
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            return res.json({
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               success:false,
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             message:"User not found."
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           });
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         user.coins += Number(coins);
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  await user.save();
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           await OwnerTransaction.create({
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  type:"Admin Coin Adjustment",
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 username:username,
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                amount:Number(coins),
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          description:"Admin added coins",
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     status:"Completed"
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               });
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     res.json({
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   success:true,
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              balance:user.coins
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       });
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }catch(err){
		    
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  console.error(err);
		    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      res.json({

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  success:false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               message:"Server error."

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           });
// GET ALL USERS FOR ADMIN COIN MANAGEMENT
 router.get("/users", async (req, res) => {

   try {

            const users = await User.find({})
                   .select("username coins");


                            res.json({

                                       success: true,

                                                    users

                                                            });


                                                               } catch(err){

                                                                         console.error(err);

                                                                                 res.json({

                                                                                            success:false,

                                                                                                        message:"Failed loading users"

                                                                                                                });

                                                                                                                   }

                                                                                                                    });
// Remove Coins
 router.post("/removeCoins", async (req, res) => {

   try {

           const { username, usernames, coins, adminPassword } = req.body;

                 const correctPassword = "JoramZeri@2026Karumia.";

                         if (adminPassword !== correctPassword) {

                                    return res.json({
                                                      success: false,
                                                                      message: "Wrong admin password."
                                                                                 });

                                                                                         }if (Array.isArray(usernames) && usernames.length > 0) {

												     let updated = 0;
												     let skipped = 0;

												     for (const name of usernames) {

													             const user = await User.findOne({ username: name });

													             if (!user || user.coins < Number(coins)) {
															                 skipped++;
															                 continue;
															             }

													             user.coins -= Number(coins);
													             await user.save();

													             await OwnerTransaction.create({
															                 type: "Admin Coin Adjustment",
															                 username: name,
															                 amount: Number(coins),
															                 description: "Bulk owner balance adjustment",
															                 status: "Completed"
															             });

													             updated++;
													         }

												     return res.json({
													             success: true,
													             updated,
													             skipped
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
                                                                                                                                                                                                                            message: "User does not have enough coins."
                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                 }


                                                                                                                                                                                                                                                          user.coins -= Number(coins);

	   await user.save();

	   await OwnerTransaction.create({

		       type: "Admin Coin Adjustment",

		       username: username,

		       amount: Number(coins),

		       description: "Owner balance adjustment",

		       status: "Completed"

	   });


	   res.json({

		       success: true,

		       balance: user.coins

	   });


                                                                                                                                                                                                                                                                                                                        } catch (err) {

                                                                                                                                                                                                                                                                                                                                  console.error(err);

                                                                                                                                                                                                                                                                                                                                         res.json({

                                                                                                                                                                                                                                                                                                                                                      success: false,

                                                                                                                                                                                                                                                                                                                                                                     message: "Server error."

                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                 });
router.post("/deleteUser", async (req, res) => {

	    try {

		            const { username, adminPassword } = req.body;

		            const correctPassword = "JoramZeri@2026Karumia.";

		            if (adminPassword !== correctPassword) {
				                return res.json({
							                success: false,
							                message: "Wrong admin password."
							            });
				            }

		            const user = await User.findOne({ username });

		            if (!user) {
				                return res.json({
							                success: false,
							                message: "User not found."
							            });
				            }

		            await Notification.deleteMany({
				                username: username
				            });

		            await Payment.deleteMany({
				                username: username
				            });

		            await Withdrawal.deleteMany({
				                username: username
				            });

		            await GameSession.deleteMany({
				                username: username
				            });

		            await QuizResult.deleteMany({
				                username: username
				            });
await SecurityLog.create({
	    username,
	    event: "Account Deleted",
	    description: "Account deleted by administrator."
});
		         
		    await User.deleteOne({
				                username: username
				            });

		            await AdminNotification.create({
				                title: "👤 Account Removed",
				                message: `The account "${username}" was permanently removed by the administrator.`,
				                type: "accountRemoval",
				                action: "userManagement"
				            });

		            res.json({
				                success: true,
				                message: "Account removed successfully."
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

});
// SEARCH USER
 router.get("/user/:username", async (req, res) => {

   try {

          const user = await User.findOne({
                       username: req.params.username
                                 });

                                        if (!user) {

                                                  return res.json({
                                                                   success: false,
                                                                                    message: "User not found."
                                                                                                });
                                                                                                        }

                                                                                                            res.json({
                                                                                                                          success: true,
                                                                                                                                       user: {
                                                                                                                                                        username: user.username,
                                                                                                                                                                       coins: user.coins,
                                                                                                                                                                                       score: user.score
                                                                                                                                                                                                   }
                                                                                                                                                                                                           });


                                                                                                                                                                                                               } catch (err) {
                                                                                                                                                                                                                        console.error(err);
                                                                                                                                                                                                                                res.json({
                                                                                                                                                                                                                                           success: false,
                                                                                                                                                                                                                                                       message: "Server error."
                                                                                                                                                                                                                                                                 });

                                                                                                                                                                                                                                                                     }

                                                                                                                                                                                                                                                                     });
// OWNER WALLET
 router.get("/ownerWallet", async (req, res) => {

     try {

           const admin = await checkAdmin(req, res);

                   if (!admin) return;


                           const transactions = await OwnerTransaction
                                        .find()
                                                    .sort({ createdAt: -1 });


                                                          let totalDeposits = 0;
                                                                   let totalWithdrawals = 0;
                                                                          let totalStakes = 0;
                                                                                   let totalRewards = 0;
	     let adminAdjustments = 0;


                                                                                           transactions.forEach(t => {

         if(t.type === "Admin Coin Adjustment")
												       adminAdjustments += t.amount;
												   if(t.type === "Deposit")
                                                                                                                        totalDeposits += t.amount;


                                                                                                                                  if(t.type === "Withdrawal")
                                                                                                                                                   totalWithdrawals += t.amount;


                                                                                                                                                                if(
																					    t.type === "Game Stake" ||
																					    t.type === "Daily Challenge"
																				)
													       totalStakes += t.amount;


                                                                                                                                                                                          if(
																								      t.type === "Reward" ||
																								      t.type === "Daily Challenge Reward" ||
																								      t.type === "Game Reward"
																							  )
													       totalRewards += t.amount;
                                                                                                                                                                                                                  });


                                                                                                                                                                                                                          res.json({

                                                                                                                                                                                                                                      success:true,

                                                                                                                                                                                                                                                   totalDeposits,

                                                                                                                                                                                                                                                               totalWithdrawals,

                                                                                                                                                                                                                                                                          totalStakes,

                                                                                                                                                                                                                                                                                       totalRewards,

                                                                                                                                                                                                                                                                                                    availableCash:
																												      totalDeposits +
																												      totalStakes +
																												      adminAdjustments -
																												      totalWithdrawals,

                                                                                                                                                                                                                                                                                                                              profit:
																												      totalStakes - totalRewards + adminAdjustments,

                                                                                                                                                                                                                                                                                                                                                         transactions
                                                                                                                                                                                                                                                                                                                                                                   });


                                                                                                                                                                                                                                                                                                                                                                       } catch(err){

                                                                                                                                                                                                                                                                                                                                                                              console.error(err);

                                                                                                                                                                                                                                                                                                                                                                                       res.json({

                                                                                                                                                                                                                                                                                                                                                                                                   success:false,

                                                                                                                                                                                                                                                                                                                                                                                                                message:"Server error."

                                                                                                                                                                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                                                                                                            });
// LIFETIME FINANCIAL HISTORY
 router.get("/financialHistory", async (req,res)=>{

    try {

             const admin = await checkAdmin(req,res);

                   if(!admin) return;


                            const transactions = await OwnerTransaction
                                       .find()
                                                    .sort({createdAt:-1});


                                                             res.json({
                                                                         success:true,

                                                                                     totalTransactions: transactions.length,

                                                                                                transactions

                                                                                                         });


                                                                                                             } catch(err){

                                                                                                                    console.error(err);

                                                                                                                             res.json({

                                                                                                                                         success:false,
                                                                                                                                                    message:"Server error."

                                                                                                                                                             });

                                                                                                                                                                }

                                                                                                                                                                });

router.get("/businessAnalytics", async (req, res) => {

	    try{

		            const username = req.headers.username;

		            const admin = await User.findOne({ username });

		            if(!admin || !admin.isAdmin){

				                return res.json({
							                success:false,
							                message:"Unauthorized"
							            });

				            }

		            const transactions = await OwnerTransaction.find().sort({ createdAt: -1 });

		            const users = await User.find();
		    const withdrawals = await Withdrawal.find();
		    let totalDeposits = 0;
		    let totalWithdrawals = 0;
		    let totalStakes = 0;
		    let totalRewards = 0;
		    let adminAdjustments = 0;

		            const today = new Date();
		            today.setHours(0,0,0,0);

		            const week = new Date();
		            week.setDate(week.getDate()-7);

		            const month = new Date();
		            month.setMonth(month.getMonth()-1);

		            let todayIncome = 0;
		            let weekIncome = 0;
		            let monthIncome = 0;
let todayWithdrawals = 0;
		            let deposits = {};

		            transactions.forEach(t=>{

				        const date = new Date(t.createdAt);
				    if (t.type === "Deposit")
					        totalDeposits += t.amount;

				    if (t.type === "Withdrawal")
					        totalWithdrawals += t.amount;

				    if (
					        t.type === "Game Stake" ||
					        t.type === "Daily Challenge"
				    )
					        totalStakes += t.amount;

				    if (
					        t.type === "Reward" ||
					        t.type === "Game Reward" ||
					        t.type === "Daily Challenge Reward"
				    )
					        totalRewards += t.amount;

				    if (t.type === "Admin Coin Adjustment")
					        adminAdjustments += t.amount;

				        if(t.status === "Completed"){

						        if(date >= today){

								            todayIncome += t.amount;

								            if(
										                    t.type === "Withdrawal" ||
										                    t.description?.toLowerCase().includes("withdraw")
										                ){
										                    todayWithdrawals += t.amount;
										                }

								        }

						        if(date >= week)
							            weekIncome += t.amount;

						        if(date >= month)
							            monthIncome += t.amount;

						        deposits[t.username] =
							            (deposits[t.username] || 0) + t.amount;

						    }

			    });withdrawals.forEach(w => {

				        const date = new Date(w.createdAt);

				        if (
						        date >= today &&
						        w.status === "Approved"
						    ) {
						        todayWithdrawals += w.amount;
						    }

			    });


		            let highestDepositor = "None";
		            let highestDeposit = 0;

		            Object.keys(deposits).forEach(name=>{

				                if(deposits[name] > highestDeposit){

							                highestDeposit = deposits[name];
							                highestDepositor = name;

							            }

				            });

		            const richestPlayer =
			                [...users].sort((a,b)=>b.coins-a.coins)[0];

		            const mostActive =
			                [...users].sort((a,b)=>b.gamesPlayed-a.gamesPlayed)[0];

		    const availableCash =
			        totalDeposits +
			        totalStakes +
			        adminAdjustments -
			        totalWithdrawals;

		    const lifetimeProfit =
			        totalStakes +
			        adminAdjustments -
			        totalRewards;
		          const todayProfit = todayIncome - todayWithdrawals;

		    const profitMargin =
			    todayIncome > 0
		    ? ((todayProfit / todayIncome) * 100).toFixed(1)
		    : 0;
		    res.json({
			        success: true,
			        totalUsers: users.length,
			        todayIncome,
			        weekIncome,
			        monthIncome,
			        todayWithdrawals,
			        todayProfit,
			        profitMargin,

			        totalDeposits,
			        totalWithdrawals,
			        totalStakes,
			        totalRewards,
			        availableCash,
			        lifetimeProfit,

			        highestDepositor,
			        highestDeposit,
			        richestPlayer,
			        mostActive
		    });

		        }catch(err){

				        res.json({
						            success:false,
						            message:err.message
						        });

				    }

});
// GET ALL USERS
 router.get("/allUsers", async (req, res) => {

     try {

           const admin = await checkAdmin(req, res);

                     if (!admin) return;

                             const users = await User.find(
                                        {},
                                                  "username coins"
                                                             ).sort({ username: 1 });

                                                                     res.json({
                                                                                success: true,
                                                                                             users
                                                                                                    });

                                                                                                       } catch (err) {

                                                                                                                 res.json({
                                                                                                                            success: false,
                                                                                                                                        message: err.message
                                                                                                                                               });

                                                                                                                                                   }

                                                                                                                                                    });
router.get("/securityLog", async (req, res) => {

	    try {

		            const admin = await checkAdmin(req, res);

		            if (!admin) return;

		            const logs =
			                await SecurityLog.find()
		                .sort({ createdAt: -1 });

		            res.json({
				                success: true,
				                logs
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

});
// DEBUG ADMIN USER
 router.get("/debugAdmin/:username", async (req, res) => {
    try {
             const User = require("../models/User");

                    const user = await User.findOne({
                               username: req.params.username
                                      }).lean();

                                                 if (!user) {
                                                             return res.json({
                                                                            success: false,
                                                                                             message: "User not found"
                                                                                                        });
                                                                                                                 }

                                                                                                                        res.json(user);

                                                                                                                            } catch (err) {
                                                                                                                                    console.error(err);
                                                                                                                                            res.json({
                                                                                                                                                       success: false,
                                                                                                                                                                    message: err.message
                                                                                                                                                                            });
                                                                                                                                                                               }
                                                                                                                                                                               });

module.exports = router;
