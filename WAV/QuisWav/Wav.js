// List of Questions and Answers

var questions = [
  {
      prompt: "Bagaimana representasi dari quantum bit?",
      options: ["0 dan 1", "|0< dan |1<", "|0> dan |1>", "1 dan 1"],
      answer: "|0> dan |1>"
  },

  {
      prompt: "Bagaimana cara kerja proses dekomposisi pada DWT?",
      options: ["DWT menghambat sinyal yang akan dianalisis pada filter dengan frekuensi dan skala yang berbeda", "DWT meloloskan sinyal yang akan dianalisis pada filter dengan frekuensi dan skala yang berbeda", "DWT meloloskan sinyal yang akan dianalisis pada filter dengan frekuensi dan skala yang sama", "DWT menghambat sinyal yang akan dianalisis pada filter dengan frekuensi dan skala yang sama"],
      answer: "DWT meloloskan sinyal yang akan dianalisis pada filter dengan frekuensi dan skala yang berbeda"
  },

  {
      prompt: "Ada berapa subband yang dihasilkan dari dekomposisi wavelet level 1?",
      options: ["2, high-pass filter dan low-pass filter", "1, high-pass filter", "1, low-pass filter", "semua jawaban benar"],
      answer: "2, high-pass filter dan low-pass filter"
  },

  {
      prompt: "Berapa nilai bit tunggal yang dapat disisipkan menggunakan teknik watermarking spread spectrum?",
      options: ["ada 2, 1 dan 2", "ada 2, 0 dan -1", "ada 2, 1 dan -1", "ada 2, 0 dan 1"],
      answer: "ada 2, 1 dan -1" 
  },

  {
      prompt: "Apa parameter yang digunakan untuk mengetahui kerusakan yang terjadi pada watermark setelah dilakukan ekstraksi pada watermark?",
      options: ["Signal to Ratio (SNR)", "Mean Square Error (MSE)", "Peak Signal-to-Noise Ratio (PSNR)", "Bit Error Rate (BER)"],
      answer: "Bit Error Rate (BER)"
  }];

// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 20;
var score = 0;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answers, go to the next question
function questionClick() {
  if (this.value === questions[currentQuestionIndex].answer) {
      score += 10;
      feedbackEl.textContent = "Benar!";
      feedbackEl.style.color = "green";
  } else {
      var correctAnswer = questions[currentQuestionIndex].answer;
      time -= 0;
      if (time < 0) {
          time = 0;
      }
      feedbackEl.textContent = "Salah! Jawaban yang benar adalah: " + correctAnswer + ".";
      feedbackEl.style.color = "red";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
      feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
      quizEnd();
  } else {
      getQuestion();
  }
}

/// End the quiz by hiding questions, stop the timer, and show the final score
function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = score + "/50";
  questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save the score in local storage along with the user's name
function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
          score: score + "/50",
          name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;

