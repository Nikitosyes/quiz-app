import { renderHowManyQuestionsPerQuiz } from "../renderSection/renderHowManyQuestionPerQuiz";

export function setUpdifficultyButtonClicked(categoryId) {
  const difficultyButtons = document.querySelectorAll(
    ".difficulty__selections button"
  );

  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const difficulty = btn.getAttribute("data-difficulty");
      renderHowManyQuestionsPerQuiz(categoryId, difficulty);
    });
  });
}
