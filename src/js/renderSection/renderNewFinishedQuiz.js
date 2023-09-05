import { quizContainer } from "../main";
import { userScore } from "../SectionsLogic/questionsLogic";
import { rightWrongAnswerStatusDisplay } from "../SectionsLogic/questionsLogic";
import { renderMainPage } from "./renderMainPage";
import {
  finishedGames,
  saveFinishedGamesInLocalStorage,
} from "../SectionsLogic/finishedGames";
import { renderCategoriesSection } from "./renderCategories";

export function renderNewFinishedQuiz(playerName, questions) {
  const howManyQuestionsCorrectString =
    userScore === 1 ? "question" : "questions ";

  const rightWrongElements = Array.from(
    { length: questions.length },
    (_, index) => {
      const status = rightWrongAnswerStatusDisplay[index];
      const rightOrWrongClass = status === "right" ? "right" : "wrong";

      return `<div class="right-wrong-result ${rightOrWrongClass}"></div>`;
    }
  ).join("");

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(currentDate);

  let newFinishedQuizHtml = ` 
   <section class="quiz__results results"  data-aos="flip-up">
   <div class="results__top">
      <div class="results__top-heading">Your results, <span class="results__player-name">${playerName}</span>: </div>
      <div class="results__date">${formattedDate}</div>
   </div>
   <div class="results__content">
      <div class="results__answered-questions">
      ${rightWrongElements}
      </div>
      <div class="results__result">
      You've answered correctly ${userScore} ${howManyQuestionsCorrectString} out of ${questions.length}
      </div>
      <div class="results__options">
         <button type="button" class="result__go-to-main">Go to main page
         </button>
         <button type="button" class="result__play-again">Play again
         </button>
      </div>
   </div>
</section>
   `;

  quizContainer.innerHTML = newFinishedQuizHtml;

  const goBackMainMenu = document.querySelector(".result__go-to-main");
  goBackMainMenu.addEventListener("click", renderMainPage);

  const playAgainBtn = document.querySelector(".result__play-again");
  playAgainBtn.addEventListener("click", renderCategoriesSection);

  let difficulty = questions[0].difficulty;
  let category = questions[0].category;

  const finishedGame = {
    id: Date.now().toString(),
    playerName: playerName,
    correctAnswers: userScore,
    category: category,
    difficulty: difficulty,
    date: formattedDate,
    totalQuestions: questions.length,
  };

  finishedGames.unshift(finishedGame);
  saveFinishedGamesInLocalStorage();
}
