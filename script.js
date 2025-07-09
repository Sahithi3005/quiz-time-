const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hightext Machine Language", "None of the above"],
    answer: "Hypertext Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const quizBox = document.getElementById("quiz-screen");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progress");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  quizBox.classList.remove("hide");
  loadQuestion();
});

function loadQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  optionButtons.forEach((btn, index) => {
    btn.innerText = q.options[index];
    btn.onclick = () => selectAnswer(btn, q.answer);
  });

  updateProgress();
}

function resetState() {
  nextBtn.style.display = "none";
  optionButtons.forEach(btn => {
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });
}

function selectAnswer(btn, correctAnswer) {
  const selected = btn.innerText;
  if (selected === correctAnswer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }

  optionButtons.forEach(button => {
    button.disabled = true;
    if (button.innerText === correctAnswer) {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreText.innerText = `${score} / ${questions.length}`;
  progressBar.style.width = "100%";
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}