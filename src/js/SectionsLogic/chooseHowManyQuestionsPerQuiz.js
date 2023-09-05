import { startQuiz } from "./questionsLogic";
import { clearHtmlForItem } from "../utilities/clearHtmlForItem";
import { quizContainer } from "../main";

export function setUpHowManyQuestionsBtnClicked(categoryId, difficulty) {
  const howManyQuestionPerQuizBtn = document.querySelectorAll(
    ".numquestions_selections button"
  );

  howManyQuestionPerQuizBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const questionsNumberPerQuiz = btn.getAttribute("data-quesions-quantity");
      const questionsNumber = parseInt(questionsNumberPerQuiz);
      clearHtmlForItem(quizContainer);
      startQuiz(categoryId, difficulty, questionsNumber);
    });
  });
}
