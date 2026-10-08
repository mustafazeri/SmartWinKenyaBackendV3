const User = require("../models/User");
const Question = require("../models/Question");
const GameSession = require("../models/GameSession");

exports.startGame = async (req, res) => {
	    try {

		            const { username, stake } = req.body;

		            if (!username || !stake) {
				                return res.json({
							                success: false,
							                message: "Username and stake are required."
							            });
				            }

		            if (stake < 10 || stake > 500) {
				                return res.json({
							                success: false,
							                message: "Stake must be between KSh 10 and KSh 500."
							            });
				            }

		            const user = await User.findOne({ username });

		            if (!user) {
				                return res.json({
							                success: false,
							                message: "User not found."
							            });
				            }

		            if (user.coins < stake) {
				                return res.json({
							                success: false,
							                message: "Insufficient balance."
							            });
				            }

		            const activeGame = await GameSession.findOne({
				                username,
				                status: "playing"
				            });

		            if (activeGame) {
				                return res.json({
							                success: false,
							                message: "Finish your current game first."
							            });
				            }

		            const questions = await Question.aggregate([
				                { $sample: { size: 10 } }
				            ]);

		            if (questions.length < 10) {
				                return res.json({
							                success: false,
							                message: "Question bank is empty."
							            });
				            }

		            user.coins -= stake;
		            await user.save();

		            const game = await GameSession.create({
				                username,
				                stake,
				                reward: stake * 5,
				                questions: questions.map(q => q._id),
				                currentQuestion: 0,
				                score: 0,
				                status: "playing"
				            });

		            res.json({
				                success: true,
				                gameId: game._id,
				                balance: user.coins,
				                question: {
							                id: questions[0]._id,
							                question: questions[0].question,
							                options: questions[0].options,
							                number: 1,
							                total: 10,
							                timer: 10
							            }
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }
};
exports.answerQuestion = async (req, res) => {

	    try {

		            const {
				                gameId,
				                answer,
				                timeTaken
				            } = req.body;

		            const game = await GameSession.findById(gameId);

		            if (!game) {
				                return res.json({
							                success: false,
							                message: "Game not found."
							            });
				            }

		            if (game.status !== "playing") {
				                return res.json({
							                success: false,
							                message: "Game already finished."
							            });
				            }

		            if (timeTaken > 10) {

				                game.status = "lost";
				    const user = await User.findOne({ username: game.username });
				    user.gamesPlayed += 1;
				    user.gamesLost += 1;
				    await user.save();

				                await game.save();

				                return res.json({
							                success: false,
							                message: "Time expired. Game Over."
							            });

				            }

		            const question = await Question.findById(
				                game.questions[game.currentQuestion]
				            );

		            if (!question) {

				                return res.json({
							                success: false,
							                message: "Question not found."
							            });

				            }

		            if (answer != question.answer) {

				                game.status = "lost";
				    const user = await User.findOne({ username: game.username });
				    user.gamesPlayed += 1;
				    user.gamesLost += 1;
				    await user.save();

				                await game.save();

				                return res.json({
							                success: false,
							                message: "Wrong answer. Game Over."
							            });

				            }

		            game.score++;

		            game.currentQuestion++;

		            if (game.currentQuestion >= 10) {

				                game.status = "won";

				                const user = await User.findOne({
							                username: game.username
							            });

				                user.coins += game.reward;
				    user.gamesPlayed += 1;
				    user.gamesWon += 1;

				                await user.save();

				                await game.save();

				                return res.json({

							                success: true,
							                finished: true,
							                reward: game.reward,
							                balance: user.coins

							            });

				            }

		            await game.save();

		            const nextQuestion = await Question.findById(
				                game.questions[game.currentQuestion]
				            );

		            res.json({

				                success: true,

				                finished: false,

				                question: {

							                id: nextQuestion._id,

							                question: nextQuestion.question,

							                options: nextQuestion.options,

							                number: game.currentQuestion + 1,

							                total: 10,

							                timer: 10

							            }

				            });

		        } catch (err) {

				        console.error(err);

				        res.json({

						            success: false,

						            message: "Server error."

						        });

				    }

};
exports.quitGame = async (req, res) => {

	    try {

		            const { gameId } = req.body;

		            const game = await GameSession.findById(gameId);

		            if (!game) {

				                return res.json({
							                success: false,
							                message: "Game not found."
							            });

				            }

		            if (game.status === "playing") {

				                game.status = "quit";

				                await game.save();

				            }

		            res.json({
				                success: true,
				                message: "Game ended."
				            });

		        } catch (err) {

				        console.error(err);

				        res.json({
						            success: false,
						            message: "Server error."
						        });

				    }

};
