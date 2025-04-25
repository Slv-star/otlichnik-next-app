import React, { useState } from "react";

// Вопросы квиза
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

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);

    setTimeout(() => {
      if (index === quizData[current].answer) {
        setScore((prev) => prev + 1);
      }

      if (current + 1 < quizData.length) {
        setCurrent((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const getResult = (): string => {
    if (score === 10) return "Легенда 'Отличника' 🎓 — ты король дневника и душа ярмарки!";
    if (score >= 8) return "Гордость школы ✨ — почти всё знаешь, даже без шпаргалок!";
    if (score >= 5) return "Скрытый отличник 😉 — ты на пути к вершине!";
    if (score >= 2) return "Гость ярмарки 🛍️ — но явно с чувством юмора!";
    return "Капибара-путешественник 🦫 — тебе просто весело!";
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  const progressPercentage = (current / quizData.length) * 100;
  const currentQuestion = quizData[current];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {showResult ? (
        <div className="result text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold">Ваш результат:</h2>
          <p className="mt-2 text-lg">{getResult()}</p>
          <p className="mt-2 text-xl">Ваш счёт: {score} из {quizData.length}</p>
          <button
            onClick={restartQuiz}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Попробовать снова
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="question-container text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
          <div className="options space-y-4">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`block w-full py-3 px-4 text-left bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none ${
                  selectedOption === i ? "bg-blue-200" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="progress mt-6">
            <p className="text-sm text-gray-600">Вопрос {current + 1} из {quizData.length}</p>
            <div
              className="h-2 bg-blue-300 rounded-full mt-2"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
