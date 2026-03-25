const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quize-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answertContainer = document.getElementById("answer-container");
const progressBar = document.getElementById("progress");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

const quizQuestions = [
	{
		question: "What is the Capital of Bangladesh?",
		answer: [
			{ text: "London", correct: false },
			{ text: "Paris", correct: false },
			{ text: "Dhaka", correct: true },
			{ text: "Berlin", correct: false },
		],
	},

	{
		question: "Which planet is known as the Red Planet?",
		answer: [
			{ text: "Venus", correct: false },
			{ text: "Mars", correct: true },
			{ text: "Jupiter", correct: false },
			{ text: "Saturn", correct: false },
		],
	},

	{
		question: "What is the largest ocean on Earth?",
		answer: [
			{ text: "Atlantic", correct: false },
			{ text: "Indian", correct: false },
			{ text: "Arctic", correct: false },
			{ text: "Pacific", correct: true },
		],
	},

	{
		question: "What is the chemical symbol for gold?",
		answer: [
			{ text: "Au", correct: true },
			{ text: "Ag", correct: false },
			{ text: "Fe", correct: false },
			{ text: "Cu", correct: false },
		],
	},
];
let currentQuestionIndex = 0;
let score = 0;
let answetDisabled = false;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	progressBar.style.width = "0%";

	startScreen.classList.remove("active");
	quizScreen.classList.add("active");

	showQuestion();
}
function showQuestion() {
	answetDisabled = false;

	const curreQuestion = quizQuestions[currentQuestionIndex];

	currentQuestionSpan.textContent = currentQuestionIndex + 1;
	totalQuestionSpan.textContent = quizQuestions.length;
	scoreSpan.textContent = score;
	questionText.textContent = curreQuestion.question;

	answertContainer.innerHTML = "";

	curreQuestion.answer.forEach((answer) => {
		const button = document.createElement("button");
		button.textContent = answer.text;
		button.classList.add("answer-btn");
		button.dataset.correct = answer.correct;
		button.addEventListener("click", selectAnswer);
		answertContainer.appendChild(button);
	});
}

function selectAnswer(event) {
	if (answetDisabled) return;
	answetDisabled = true;

	const selectedButton = event.target;
	const isCorrect = selectedButton.dataset.correct === "true";

	Array.from(answertContainer.children).forEach((button) => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		} else if (button === selectedButton) {
			//confusion
			button.classList.add("incorrect");
		}
	});

	if (isCorrect) {
		score++;
		scoreSpan.textContent = score;
	}
	currentQuestionIndex++;

	const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
	progressBar.style.width = progressPercent + "%";
	setTimeout(() => {
		if (currentQuestionIndex < quizQuestions.length) {
			showQuestion();
		} else {
			showResult();
		}
	}, 1500);
}

function showResult() {
	quizScreen.classList.remove("active");
	resultScreen.classList.add("active");

	finalScoreSpan.textContent = score;
	maxScoreSpan.textContent = quizQuestions.length;

	const percentage = (score / quizQuestions.length) * 100;

	if (percentage === 100) {
		resultMessage.textContent = "Perfect! You're a genius!";
	} else if (percentage >= 80) {
		resultMessage.textContent = "Great Job! You Know your stuff!";
	} else if (percentage >= 60) {
		resultMessage.textContent = "Good effort! Keep learning!";
	} else if (percentage >= 40) {
		resultMessage.textContent = "Not bad! Try again to improve!";
	} else {
		resultMessage.textContent = "Keep studying! You'll get better!";
	}
}

function restartQuiz() {
	resultScreen.classList.remove("active");
	startQuiz();
}
