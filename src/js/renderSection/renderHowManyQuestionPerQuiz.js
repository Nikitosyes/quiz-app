import { backToCategories } from "../SectionsLogic/categoriesSectionLogic";
import { setUpHowManyQuestionsBtnClicked } from "../SectionsLogic/chooseHowManyQuestionsPerQuiz";
import { quizContainer } from "../main";

export function renderHowManyQuestionsPerQuiz(categoryId, difficulty) {
  let howManyQuestionsPerQuizHtml = `   
   <section class="quiz__numquestions numquestions">
    <div class="numquestions__top">
       <i class="fa-solid fa-circle-left go-back go-back-difficulty"></i>
       <div class="numquestions__heading">Select how many questions per Quiz</div>
    </div>
    <div class="numquestions_selections">
       <button data-quesions-quantity="5" type="button">5</button>
       <button data-quesions-quantity="10" type="button">10</button>
       <button data-quesions-quantity="15" type="button">15</button> 
       <button data-quesions-quantity="20" type="button">20</button> 
     </div>
 </section>`;

  quizContainer.innerHTML = howManyQuestionsPerQuizHtml;
  quizContainer.classList.remove("flex-layout");

  const goBackToDifficultySection = document.querySelector(
    ".go-back-difficulty"
  );

  goBackToDifficultySection.addEventListener("click", () => {
    backToCategories();
  });

  setUpHowManyQuestionsBtnClicked(categoryId, difficulty);
}
