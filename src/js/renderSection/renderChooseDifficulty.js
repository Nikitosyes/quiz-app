import { setUpdifficultyButtonClicked } from "../SectionsLogic/chooseDifficultyLogic";
import { quizContainer } from "../main";
import { backToCategories } from "../SectionsLogic/categoriesSectionLogic";

export function renderChooseDifficulty(categoryId) {
  let chooseDifficultyHtml = `   
  <section class="quiz__difficulty difficulty">
   <div class="difficulty__top">
      <i class="fa-solid fa-circle-left go-back go-back-categories"></i>
      <div class="difficulty__heading">Select difficulty</div>
   </div>
   <div class="difficulty__selections">
      <button data-difficulty="easy" type="button">Easy</button>
      <button data-difficulty="medium"  type="button">Medium</button>
      <button data-difficulty="hard"  type="button">Hard</button> 
    </div>
</section>`;

  quizContainer.innerHTML = chooseDifficultyHtml;
  quizContainer.classList.remove("flex-layout");

  const goBackToCategories = document.querySelector(".go-back-categories");

  goBackToCategories.addEventListener("click", () => {
    backToCategories();
  });

  setUpdifficultyButtonClicked(categoryId);
}
