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
const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".answer button");
const nextButton = document.getElementById("next-button");
const refreshBtn = document.getElementById("refresh");
refreshBtn.style.display = "none";

function startQuiz()
{
  questionText.innerText = questions[currentQuestion].question;
  optionButtons.forEach((button, index) => {
  button.innerText = questions[currentQuestion].options[index];
  button.addEventListener("click", () => checkAnswer(index));
  });
}

function checkAnswer(selectedIndex) 
{

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

}

function finishQuiz() {

  questionText.innerText = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
  nextButton.style.display = "none";
  optionButtons.forEach(function(element)
  {
    element.style.display = 'none';
  });
  refreshBtn.style.display = "block";
  

}

refreshBtn.addEventListener("click", function()
{
  location.reload();
});


nextButton.addEventListener("click", () => checkAnswer());

// Начало

startQuiz();
      



