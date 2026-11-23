const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	    username: {
		            type: String,
		            required: true,
		            unique: true,
		            trim: true
		        },

	    password: {
		            type: String,
		            required: true
		        },
	fullName: {
		    type: String,
		    required: true,
		    trim: true
	},

	nationalId: {
		    type: String,
		    required: true,
		    unique: true,
		    trim: true
	},

	failedResetAttempts: {
		    type: Number,
		    default: 0
	},

	resetLockedUntil: {
		    type: Date,
		    default: null
	},
	
	resetLockLevel: {
		    type: Number,
		    default: 0
	},
	verified: {
		    type: Boolean,
		    default: true
	},
	phone: {
		    type: String,
		    required: true,
		    unique: true,
		    trim: true
	},

	    isAdmin: {
		            type: Boolean,
		            default: false
		        },

	    coins: {
		            type: Number,
		            default: 0,
		            min: 0
		        },

	    score: {
		            type: Number,
		            default: 0
		        },
	lastDailyChallenge: {
		    type: Date,
		    default: null
	},

	    gamesPlayed: {
		            type: Number,
		            default: 0
		        },

	    gamesWon: {
		            type: Number,
		            default: 0
		        },

	    gamesLost: {
		            type: Number,
		            default: 0
		        },

	    totalDeposited: {
		            type: Number,
		            default: 0
		        },

	    totalWithdrawn: {
		            type: Number,
		            default: 0
		        },

	    referralCode: {
		            type: String,
		            unique: true,
		            sparse: true
		        },

	    referredBy: {
		            type: String,
		            default: null
		        },

	    referralRewardPaid: {
		            type: Boolean,
		            default: false
		        },

	    seenQuestions: [{
		            type: mongoose.Schema.Types.ObjectId,
		            ref: "Question"
		        }]

}, {
	    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
