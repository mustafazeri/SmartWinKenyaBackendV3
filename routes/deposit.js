const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, phone, amount } = req.body;

    if (!username || !phone || !amount) {
      return res.json({
        success: false,
        message: "Username, phone and amount are required."
      });
    }

    let phoneNumber = phone.trim();

    if (phoneNumber.startsWith("07")) {
      phoneNumber = "254" + phoneNumber.substring(1);
    }

    if (phoneNumber.startsWith("7")) {
      phoneNumber = "254" + phoneNumber;
    }

    console.log("PHONE RECEIVED:", phone);
    console.log("PHONE SENT TO SAFARICOM:", phoneNumber);
    console.log("BODY:", req.body);

    const auth = Buffer.from(
      process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET
    ).toString("base64");

    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      process.env.BUSINESS_SHORT_CODE +
      process.env.PASSKEY +
      timestamp
    ).toString("base64");

    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Number(amount),
        PartyA: phoneNumber,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "SmartWin",
        TransactionDesc: "Buy Coins"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return res.json(stkResponse.data);

  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.json({
      success: false,
      message: err.response?.data || err.message
    });
  }
});

module.exports = router;

