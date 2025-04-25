import React, { useState } from "react";

// Quiz data with questions, options, and answers
const quizData = [
  {
    question: "Какой предмет в школе 'Отличник' начинается с фразы 'Сиди ровней, пиши быстрее!'?",
    options: ["Физкультура", "Русский язык", "Технология", "Математика"],
    answer: 1,
  },
  {
    question: "Какой предмет преподаёт директор?",
    options: [
      "Как стать директором",
      "Перемены",
      "Искусство строгости",
      "Он только наблюдает. Всегда. Везде."
    ],
    answer: 3,
  },
  {
    question: "Что продаётся на благотворительной ярмарке школы 'Отличник'?",
    options: [
      "Контрольные по математике",
      "Волшебные пятёрки",
      "Футболки, ручки, шоперы, магниты",
      "Котлеты из столовки"
    ],
    answer: 2,
  },
  {
    question: "Какой девиз идеально подойдёт для ученика 'Отличника'?",
    options: [
      "Ученье — свет, а лень — двигатель прогресса",
      "Пятёрки — это стиль жизни",
      "Пропустил — пересдал, проспал — повторил",
      "Главное — участие"
    ],
    answer: 1,
  },
  {
    question: "Как попасть в 'Отличник'?",
    options: [
      "Сдать супер-экзамен",
      "Купить ручку на ярмарке",
      "Просто захотеть учиться",
      "Перепрыгнуть через лужу у входа и трижды сказать 'пятёрка'"
    ],
    answer: 2,
  },
  {
    question: "Сколько стоит ручка с надписью 'Сиди ровней, пиши быстрее!'?",
    options: ["Бесплатно, если сидишь прямо", "100 руб.", "200 руб.", "500 баллов уважения"],
    answer: 2,
  },
  {
    question: "Что означает надпись 'Я ❤️ Отличник' на футболке?",
    options: [
      "Это признание любви к учёбе",
      "Это кодовая фраза для пятёрки",
      "Это лозунг участников ярмарки",
      "Все вышеперечисленное"
    ],
    answer: 3,
  },
  {
    question: "Какой предмет чаще всего теряется на переменах?",
    options: ["Настроение", "Пенал", "Ручка 'Отличник'", "Домашка"],
    answer: 2,
  },
  {
    question: "Какая суперспособность у футболки 'Отличник'?",
    options: [
      "Делает носителя отличником",
      "Ты становишься невидимкой на уроках",
      "Светится на проверках тетрадей",
      "Даёт иммунитет от контрольных"
    ],
    answer: 0,
  },
  {
    question: "Кто может прийти на ярмарку школы 'Отличник'?",
    options: [
      "Только круглые отличники",
      "Родители учеников",
      "Все желающие!",
      "Только любители капибар"
    ],
    answer: 2,
  },
];

export default function App() {
  // State for tracking current question, score, and whether to show results
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle answer selection
  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setIsAnimating(true);
    
    // Delay to show the selected answer before moving to next question
    setTimeout(() => {
      // Check if current index is valid before accessing
      const currentQuestionData = current < quizData.length ? quizData[current] : null;
      if (currentQuestionData && index === currentQuestionData.answer) {
        setScore(score + 1);
      }
      
      const next = current + 1;
      if (next < quizData.length) {
        setCurrent(next);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);
    }, 500);
  };

  // Get personalized result message based on score
  const getResult = () => {
    if (score === 10) return "Легенда 'Отличника' 🎓 — ты король дневника и душа ярмарки!";
    if (score >= 8) return "Гордость школы ✨ — почти всё знаешь, даже без шпаргалок!";
    if (score >= 5) return "Скрытый отличник 😉 — ты на пути к вершине!";
    if (score >= 2) return "Гость ярмарки 🛍️ — но явно с чувством юмора!";
    return "Капибара-путешественник 🦫 — тебе просто весело!";
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  // Calculate progress percentage
  const progressPercentage = ((current) / quizData.length) * 100;

  // Make sure we have a valid current question
  const currentQuestion = current < quizData.length ? quizData[current] : null;

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Ваш результат:</h2>
          <p>{getResult()}</p>
          <p>Ваш счёт: {score} из {quizData.length}</p>
          <button onClick={restartQuiz}>Попробовать снова</button>
        </div>
      ) : currentQuestion ? (
        <div className="question-container">
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`option-button ${selectedOption === index ? "selected" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="progress">
            <p>Вопрос {current + 1} из {quizData.length}</p>
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
