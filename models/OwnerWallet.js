const mongoose = require("mongoose");

const ownerWalletSchema = new mongoose.Schema({

	    totalDeposits: {
		            type: Number,
		            default: 0
		        },

	    totalWithdrawalsPaid: {
		            type: Number,
		            default: 0
		        },

	    totalGameStakes: {
		            type: Number,
		            default: 0
		        },

	    totalRewardsPaid: {
		            type: Number,
		            default: 0
		        }

}, {
	    timestamps: true
});

module.exports = mongoose.model("OwnerWallet", ownerWalletSchema);
