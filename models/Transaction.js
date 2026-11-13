const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	    username: {
		            type: String,
		            required: true
		        },
	    type: {
		            type: String,
		            enum: ["deposit", "stake", "reward", "withdrawal"],
		            required: true
		        },
	    amount: {
		            type: Number,
		            required: true
		        },
	    balanceAfter: {
		            type: Number,
		            default: 0
		        },
	    gameId: {
		            type: mongoose.Schema.Types.ObjectId,
		            ref: "GameSession",
		            default: null
		        },
	    status: {
		            type: String,
		            default: "completed"
		        },
	    createdAt: {
		            type: Date,
		            default: Date.now
		        }
});

module.exports = mongoose.model("Transaction", transactionSchema);
