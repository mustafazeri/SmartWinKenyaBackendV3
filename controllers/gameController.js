const User = require("../models/User");
const Question = require("../models/Question");
const GameSession = require("../models/GameSession");
const CATEGORIES = [
	    "Kenya",
	    "Science",
	    "Technology",
	    "Driving",
	    "Agriculture",
	    "Sports",
	    "History",
	    "Business",
	    "English",
	    "IQ"
];
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
			    activeGame.status = "quit";
			    await activeGame.save();
		}

		                  let easy = 6;
		    let medium = 3;
		    let hard = 1;
		    let expert = 0;

		    if (stake >= 51 && stake <= 150) {

			        easy = 3;
			        medium = 5;
			        hard = 2;

		    }

		    if (stake >= 151 && stake <= 300) {

			        easy = 2;
			        medium = 3;
			        hard = 4;
			        expert = 1;

		    }

		    if (stake >= 301) {

			        easy = 0;
			        medium = 2;
			        hard = 5;
			        expert = 3;

		    }

		    const questions = [];

		    async function pickQuestions(difficulty, amount) {

			        for (let i = 0; i < amount; i++) {

					        const category = CATEGORIES[i % CATEGORIES.length];

					        const q = await Question.aggregate([
							            {
									                    $match: {
												        difficulty,
												        category,
												        _id: {
														        $nin: questions.map(q => q._id)
														    }
											    }
									                },
							            {
									                    $sample: {
												                        size: 1
												                    }
									                }
							        ]);

					        if (q.length > 0) {

							            questions.push(q[0]);

							        }

					    }

		    }

		    await pickQuestions("Easy", easy);
		    await pickQuestions("Medium", medium);
		    await pickQuestions("Hard", hard);
		    await pickQuestions("Expert", expert);

		    questions.sort(() => Math.random() - 0.5);

		            while (questions.length < 10) {

				        const extra = await Question.aggregate([
						        {
								            $match: {
										                    _id: {
													                        $nin: questions.map(q => q._id)
													                    }
										                }
								        },
						        {
								            $sample: {
										                    size: 1
										                }
								        }
						    ]);

				        if (extra.length === 0) {
						        break;
						    }

				        questions.push(extra[0]);

			    }

		    if (questions.length < 10) {

			        return res.json({
					        success: false,
					        message: "Not enough questions in database."
					    });

		    }

		            user.coins -= stake;
		            await user.save();

		            const game = await GameSession.create({
				                username,
				                stake,
				                reward: stake * 2,
				                questions: questions.map(q => q._id),
				                currentQuestion: 0,
				                score: 0,
				                status: "playing",
				    mode: "normal",
				            });
		    console.log("GAME ID:", game._id.toString());

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
							                timer: 15
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

							    message: "Wrong answer. Game Over.",

							    correctAnswer: question.options[question.answer],

							    correctIndex: question.answer

						});

				            }

		            game.score++;

		            game.currentQuestion++;

		            if (game.currentQuestion >= 10) {

				                game.status = "won";

				                const user = await User.findOne({
							                username: game.username
							            });

				               let reward = game.reward;

				    if (game.mode !== "daily") {
					        reward = game.reward;
				    }

				    user.coins += reward;

				    user.gamesPlayed += 1;
				    user.gamesWon += 1;

				    await user.save();

				    await game.save();

				    return res.json({

					        success: true,

					        finished: true,

					        reward: reward,

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

timer: 15,
							                number: game.currentQuestion + 1,

							                total: 10


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
exports.startDailyChallenge = async (req, res) => {

	    try {

		            const { username } = req.body;

		    const user = await User.findOne({ username });

		    if (!user) {
			        return res.json({
					        success: false,
					        message: "User not found."
					    });
		    }

		    if (user.coins < 200) {
			        return res.json({
					        success: false,
					        message: "You need 200 coins to play the Daily Challenge."
					    });
		    }

		    if (user.lastDailyChallenge) {

			        const now = new Date();
			        const last = new Date(user.lastDailyChallenge);

			        const hours = (now - last) / (1000 * 60 * 60);

			        if (hours < 24) {

					        return res.json({
							            success: false,
							            message: "You have already played today's Daily Challenge."
							        });

					    }

		    }
		    user.coins -= 200;

		    user.lastDailyChallenge = new Date();

		    await user.save();
		    const questions = await Question.aggregate([
			        {
					        $sample: {
							            size: 10
							        }
					    }
		    ]);

		    if (questions.length < 10) {

			        return res.json({
					        success: false,
					        message: "Not enough Expert questions available."
					    });

		    }
		    const game = await GameSession.create({

			        username,

			        stake: 200,

			        reward: 1000,

			        questions,

			        currentQuestion: 0,

			        score: 0,

			        mode: "daily",

			        status: "playing"

		    });

		    res.json({

			        success: true,

			        gameId: game._id,

			        balance: user.coins,

			        question: {
					        ...questions[0],
					        number: 1,
					        total: 10,
					        timer: 15
					    }

		    });
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
exports.resumeGame = async (req, res) => {

	    try {

		            const { username } = req.body;

		            const game = await GameSession.findOne({
				                username,
				                status: "playing"
				            });

		            if (!game) {
				                return res.json({
							                success: false,
							                message: "No active game found."
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

		            res.json({
				                success: true,
				                gameId: game._id,
				                question: {
							                id: question._id,
							                question: question.question,
							                options: question.options,
							                number: game.currentQuestion + 1,
							                total: 10,
							                timer: game.mode === "daily" ? 15 : 10
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
