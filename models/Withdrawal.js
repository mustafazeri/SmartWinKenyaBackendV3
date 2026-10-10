const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    coins: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
