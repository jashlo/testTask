
const questions = 
[

  {
    
    question: "Сколько планет в солнечной системе?",
    
    options: ["7", "8", "9"],
    
    correctAnswer: 1
    
  },

  {
    
    question: "Кто был автором Ромео и Джульетты?",
    
    options: ["Вильям Шекспир", "Чарльз Диккенс", "Федор Достоевский"],
    
    correctAnswer: 0
    
  },

  {
    
    question: "Какое животное является символом Китая?",
    
    options: ["Дракон", "Феникс", "Панда"],
    
    correctAnswer: 0
    
  },

  {
    
    question: "Самая высокая гора в мире?",
    
    options: ["Килиманджаро", "Эверест", "Аконкагуа"],
    
    correctAnswer: 1
    
  },

  {
    
    question: "Процесс, при котором растения превращают солнечную энергию в химическую энергию?",
    
    options: ["Дыхание", "Ферментация", "Фотосинтез"],
    
    correctAnswer: 2
    
  },
  
];
  
let currentQuestion = 0; 
let score = 0;
let timer;
const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".answer button");
const nextButton = document.getElementById("next-button");
const refreshBtn = document.getElementById("refresh");

refreshBtn.style.display = "none";




function updateTimerDisplay(timeLeft) {
  const timerElement = document.getElementById("timer");
  timerElement.innerText = timeLeft;
} 


function startTimer() {
  let timeLeft = 5; // Время в секундах
  updateTimerDisplay(timeLeft); // Обновляем элемент с таймером
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft); // Обновляем элемент с таймером
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showNextQuestion();
      } else {
        finishQuiz();
      }
    }
  }, 1000); // Интервал обновления таймера в миллисекундах (1000 мс = 1 сек)
}

function resetTimer()
{
  clearTimeout(timer);
}

function showNextQuestion() {
  resetTimer();

  questionText.innerText = questions[currentQuestion].question;
  optionButtons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
  });

  

  startTimer();
}

function startQuiz() {
  questionText.innerText = questions[currentQuestion].question;

  optionButtons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
    button.addEventListener("click", () => checkAnswer(index));
  });
  

  
}

function checkAnswer(selectedIndex) 
{
  resetTimer();
  
  if (selectedIndex === questions[currentQuestion].correctAnswer)
  {

    optionButtons.forEach(function(element)
    {
      element.style.borderColor = '#50C878';
    });
    score++;
  }
  else
  {
    optionButtons.forEach(function(element)
    {
      element.style.borderColor = '#DC143C';
    });
  }

  currentQuestion++;

  if (currentQuestion < questions.length)
  {
    questionText.innerText = questions[currentQuestion].question;
    optionButtons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
    });
  } 
  else
  {
    finishQuiz();
  }
  

  startTimer();
  
}

function finishQuiz() {

  questionText.innerText = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
  nextButton.style.display = "none";
  optionButtons.forEach(function(element)
  {
    element.style.display = 'none';
  });
  refreshBtn.style.display = "block";
  timerElement.style.display = "none";
  

}



refreshBtn.addEventListener("click", function()
{
  location.reload();
});


nextButton.addEventListener("click", () => checkAnswer());

// Начало

startQuiz();
startTimer();
      


// Change theme
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";

  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}


function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}



const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");


let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });


updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });


button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
}); 


