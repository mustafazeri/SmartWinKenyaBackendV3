const express = require("express");
const router = express.Router();

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
router.post("/addCoins", async (req, res) => {
	    try {

		            const { username, coins, adminPassword } = req.body;

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

		            user.coins += Number(coins);

		            await user.save();

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
// Remove Coins
 router.post("/removeCoins", async (req, res) => {

   try {

           const { username, coins, adminPassword } = req.body;

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
// BUSINESS INSIGHTS
 router.get("/businessInsights", async (req,res)=>{

   try {

             const admin = await checkAdmin(req,res);

                     if(!admin) return;


                            const users = await User.find();


                                    let totalCoins = 0;
                                            let gamesPlayed = 0;


                                                     users.forEach(user=>{

                                                                 totalCoins += user.coins;

                                                                            gamesPlayed += user.gamesPlayed || 0;
                                                                                    });


                                                                                             const transactions = await OwnerTransaction.find();


                                                                                                    let totalDeposits = 0;
                                                                                                             let totalWithdrawals = 0;
                                                                                                                   let totalStakes = 0;
                                                                                                                            let totalRewards = 0;
                                                                                                                                   let adminAdjustments = 0;


                                                                                                                                             transactions.forEach(t=>{

                                                                                                                                                        if(t.type === "Deposit")
                                                                                                                                                                         totalDeposits += t.amount;


                                                                                                                                                                                   if(t.type === "Withdrawal")
                                                                                                                                                                                                     totalWithdrawals += t.amount;


                                                                                                                                                                                                                if(
                                                                                                                                                                                                                               t.type === "Game Stake" ||
                                                                                                                                                                                                                                                t.type === "Daily Challenge"
                                                                                                                                                                                                                                                            )                                                                                                                                                                                                                                                                           totalStakes += t.amount;


                                                                                                                                                                                                                                                                                         if(
                                                                                                                                                                                                                                                                                                     t.type === "Reward" ||
                                                                                                                                                                                                                                                                                                                        t.type === "Game Reward" ||
                                                                                                                                                                                                                                                                                                                                        t.type === "Daily Challenge Reward"
                                                                                                                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                                                                                                                                  totalRewards += t.amount;


                                                                                                                                                                                                                                                                                                                                                                               if(t.type === "Admin Coin Adjustment")
                                                                                                                                                                                                                                                                                                                                                                                                 adminAdjustments += t.amount;


                                                                                                                                                                                                                                                                                                                                                                                                       });



                                                                                                                                                                                                                                                                                                                                                                                                              res.json({

                                                                                                                                                                                                                                                                                                                                                                                                                            success:true,

                                                                                                                                                                                                                                                                                                                                                                                                                                      totalUsers: users.length,

                                                                                                                                                                                                                                                                                                                                                                                                                                                   totalCoins,

                                                                                                                                                                                                                                                                                                                                                                                                                                                              totalWalletValue: totalCoins,


                                                                                                                                                                                                                                                                                                                                                                                                                                                                           totalDeposits,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      totalWithdrawals,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   totalStakes,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                totalRewards,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         adminAdjustments,


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      availableCash:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   totalDeposits +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                totalStakes +
 
 adminAdjustments -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        totalWithdrawals,


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   profit:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                totalStakes +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          adminAdjustments -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         totalRewards,


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    gamesPlayed


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             });



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }catch(err){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.error(err);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 res.json({

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            success:false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         message:"Server error"

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

		            const transactions =
			                await Payment.find().sort({createdAt:-1});

		            const users = await User.find();

		            const today = new Date();
		            today.setHours(0,0,0,0);

		            const week = new Date();
		            week.setDate(week.getDate()-7);

		            const month = new Date();
		            month.setMonth(month.getMonth()-1);

		            let todayIncome = 0;
		            let weekIncome = 0;
		            let monthIncome = 0;

		            let deposits = {};

		            transactions.forEach(t=>{

				                if(t.type==="Deposit"){

							                if(new Date(t.createdAt)>=today)
								                    todayIncome += t.amount;

							                if(new Date(t.createdAt)>=week)
								                    weekIncome += t.amount;

							                if(new Date(t.createdAt)>=month)
								                    monthIncome += t.amount;

							                deposits[t.username] =
								                    (deposits[t.username] || 0)
							                    + t.amount;

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

		            res.json({

				                success:true,

				                todayIncome,

				                weekIncome,

				                monthIncome,

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
module.exports = router;
