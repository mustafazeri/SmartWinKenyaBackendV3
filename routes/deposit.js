const express = require("express");

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

    if (Number(amount) < 50) {
      return res.json({
        success: false,
        message: "Minimum deposit is KSh 50."
      });
    }

    return res.json({
      success: true,
      message: "Deposit route is working.",
      username,
      phone,
      amount
    });

  } catch (err) {
    console.error(err);

    return res.json({
      success: false,
      message: "Server error."
    });
  }
});

module.exports = router;
