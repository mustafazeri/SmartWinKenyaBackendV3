require("dotenv").config();

const mongoose = require("mongoose");

const Payment = require("./models/Payment");
const OwnerTransaction = require("./models/OwnerTransaction");

async function migrate() {

	    try {

		            await mongoose.connect(process.env.MONGODB_URI);

		            console.log("✅ MongoDB Connected");

		            const payments = await Payment.find({
				                status: "Completed"
				            });

		            let imported = 0;

		            for (const payment of payments) {

				                const exists = await OwnerTransaction.findOne({
							                type: "Deposit",
							                username: payment.username,
							                amount: payment.amount,
							                description: "M-Pesa Deposit",
							                createdAt: payment.createdAt
							            });

				                if (exists) {
							                continue;
							            }

				                const transaction = new OwnerTransaction({
							                type: "Deposit",
							                username: payment.username,
							                amount: payment.amount,
							                description: "M-Pesa Deposit",
							                createdAt: payment.createdAt,
							                updatedAt: payment.updatedAt
							            });

				                await transaction.save();
				                imported++;

				            }

		            console.log(`✅ Imported ${imported} completed deposits`);

		            process.exit(0);

		        } catch (err) {

				        console.error(err);
				        process.exit(1);

				    }

}

migrate();
