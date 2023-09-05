import { fetchQuestions } from "../Request/fetchQuestions";
import { renderQuestionsHtml } from "../renderSection/renderQuestions";
import he from "he";
import { setUpGoToResultsNameBtnClick } from "./inputNameSectionLogic";

let currentQuestionIndex = 0;
let questionTimerDuration;
export let userScore = 0;
export let rightWrongAnswerStatusDisplay;

export async function startQuiz(categoryId, difficulty, questionsNumber) {
  const questions = await fetchQuestions(
    categoryId,
    difficulty,
    questionsNumber
  );
  userScore = 0;
  currentQuestionIndex = 0;
  let currentQuestion = questions[currentQuestionIndex];
  rightWrongAnswerStatusDisplay = new Array(questions.length);
  console.log(questions);

  function renderQuestion(currentQuestion) {
    renderQuestionsHtml(currentQuestion, currentQuestionIndex, questions);

    const answers = document.querySelectorAll(".questions__answer");
    answers.forEach((answer) => {
      setTimeout(() => {
        answer.classList.add("animate");
      }, 0);
      setTimeout(() => {
        answer.classList.add("hover");
      }, 600);
      answer.addEventListener("click", () => {
        handleAnswer(answer, currentQuestion.correct_answer);
      });
    });

    const progressElements = document.querySelectorAll(".right-wrong-answered");
    progressElements.forEach((progressElement, index) => {
      const answerStatus = rightWrongAnswerStatusDisplay[index];
      if (answerStatus === "right") {
        progressElement.classList.add("right");
      } else if (answerStatus === "wrong") {
        progressElement.classList.add("wrong");
      }
    });

    const timerElement = document.querySelector(".questions__timer");
    let timeRemaining = 20;
    timerElement.innerHTML = `<p>Time Left</p><span>${timeRemaining}</span>`;
    questionTimerDuration = setInterval(() => {
      timeRemaining--;
      timerElement.innerHTML = `<p>Time Left</p><span>${timeRemaining}</span>`;
      if (timeRemaining === 0) {
        clearInterval(questionTimerDuration);
        timerElement.classList.add("ended");
        timerElement.innerHTML = ` <p>Time's Up</p><span>${timeRemaining}</span>`;
        handleAnswer(null, currentQuestion.correct_answer);
      }
    }, 1000);
  }

  function handleAnswer(selectedAnswer, correctAnswer) {
    const answerButtons = document.querySelectorAll(".questions__answer");
    answerButtons.forEach((button) => {
      button.disabled = true;
      button.classList.remove("hover");
      button.style.cursor = "not-allowed";
    });

    const progressElements = document.querySelectorAll(".right-wrong-answered");

    if (selectedAnswer !== null && checkAnswer(selectedAnswer, correctAnswer)) {
      selectedAnswer.classList.add("right");
      progressElements[currentQuestionIndex].classList.add("right");
      rightWrongAnswerStatusDisplay[currentQuestionIndex] = "right";
      userScore++;
    } else {
      selectedAnswer?.classList?.add("wrong");
      progressElements[currentQuestionIndex].classList.add("wrong");
      rightWrongAnswerStatusDisplay[currentQuestionIndex] = "wrong";
      //showing correct answer with slight delay
      setTimeout(() => {
        const correctAnswerTextDecoded = he.decode(correctAnswer);
        const realCorrectAnswer = Array.from(answerButtons).find(
          (answer) =>
            he.decode(answer.textContent).trim() === correctAnswerTextDecoded
        );
        realCorrectAnswer.classList.add("right");
      }, 700);
    }

    clearInterval(questionTimerDuration);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        renderNextQuestionButton();
      } else {
        renderGoToResultsNameBtn(questions);
      }
    }, 700);
  }

  function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === null) {
      return false;
    }
    const selectedAnswerTextDecoded = he.decode(
      selectedAnswer.innerHTML.trim()
    );
    const corrcetAnswerTextDecoded = he.decode(correctAnswer);
    return selectedAnswerTextDecoded === corrcetAnswerTextDecoded;
  }

  function renderNextQuestionButton() {
    const containerForBtn = document.querySelector(".questions__next");

    containerForBtn.innerHTML = `<button class="btn__next"  data-aos="zoom-out" type="button">Next Question</button>`;
    let nextQuestionBtn = document.querySelector(".btn__next");
    nextQuestionBtn.addEventListener("click", () => {
      handleNextQuestionBtnClick();
    });
  }

  function renderGoToResultsNameBtn(questions) {
    const containerForBtn = document.querySelector(".questions__next");

    containerForBtn.innerHTML = ` <button class="btn__player"  data-aos="zoom-out" type="button">Results</button>`;
    let goToResultsInputBtn = document.querySelector(".btn__player");
    goToResultsInputBtn.addEventListener("click", () => {
      setUpGoToResultsNameBtnClick(questions);
    });
  }

  function handleNextQuestionBtnClick() {
    currentQuestionIndex++;
    currentQuestion = questions[currentQuestionIndex];
    renderQuestion(currentQuestion);
  }

  // Start the quiz by rendering the first question
  renderQuestion(currentQuestion);
}
