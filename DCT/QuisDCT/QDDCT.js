// List of Questions and Answers

var questions = [
  {
      prompt: "Apa perbedaan bit klasik dengan bit kuantum/qubit?",
      options: ["Bit kuantum tidak dapat berada pada keadaan superposisi", "Bit clasik dapat berada pada keadaan superposisi", "Bit kuantum dapat berada pada keadaan superposisi", "Bit kuantum dan klasik berbeda hanya dalam bentuknya saja"],
      answer: "Bit kuantum dapat berada pada keadaan superposisi"
  },

  {
      prompt: "Teknik yang mengubah sinyal amplitudo pada audio menjadi sinyal frekuensi adalah?",
      options: ["SS", "LSB", "DCT", "Wavelet"],
      answer: "DCT"
  },

  {
      prompt: "Apa yang dimaksud dengan Signal to Noise Ratio?",
      options: ["Signal to Noise Ratio (SNR) adalah perbandingan nilai antara sinyal audio asli dengan error sinyal audio yang sudah ter-watermark", "Signal to Noise Ratio (SNR) adalah hasil dari sinyal yang sudah ter-watermark", "Signal to Noise Ratio (SNR) adalah hasil sinyal error dari audio yang sudah ter-watermark", "Semua jawaban benar"],
      answer: "Signal to Noise Ratio (SNR) adalah perbandingan nilai antara sinyal audio asli dengan error sinyal audio yang sudah ter-watermark"
  },

  {
      prompt: "Bagaimana konsep watermarking menggunakan Spread Spectrum?",
      options: ["watermarking berbasis Spread Spectrum (SS) adalah menyebarkan setiap bit watermark di atas spektrum sinyal host", "watermarking berbasis Spread Spectrum (SS) adalah menyebarkan setiap bit watermark di bawah spektrum sinyal host", "watermarking berbasis Spread Spectrum (SS) adalah menyebarkan hanya bit awal saja di spektrum sinyal host", "tidak ada jawaban yang benar"],
      answer: "watermarking berbasis Spread Spectrum (SS) adalah menyebarkan setiap bit watermark di atas spektrum sinyal host" 
  },

  {
      prompt: "Apa yang dimaksud dengan MOS?",
      options: ["Mean Opinion Score (MOS) adalah parameter objektif hasil penilaian secara reseptual dari survei terhadap responden", "Mean Opinion Score (MOS) adalah parameter keberhasilan dari proses penyatuan antara file host dan file watermark", "Mean Opinion Score (MOS) adalah parameter keberhasilan dari proses pemisahan ter-watermark", "Mean Opinion Score (MOS) adalah parameter subjektif hasil penilaian secara perseptual dari survei terhadap responden"],
      answer: "Mean Opinion Score (MOS) adalah parameter subjektif hasil penilaian secara perseptual dari survei terhadap responden"
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

// Check for right answers and deduct time for wrong answer, go to next question
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

// End quiz by hiding questions, stop timer and show final score
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

