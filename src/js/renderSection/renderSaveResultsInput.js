import { quizContainer } from "../main";

export function renderSaveResultsNameInput() {
  let inputNameSaveHtml = `<section class="quiz__input-name input-name">
   <div class="input-name__heading" data-aos="flip-up" >Provide your name:</div>
   <form class="form input-name__content">
      <div class="input-name__input">
         <div class="error_for-input"></div>
         <input type="text" placeholder="type in your Name..." data-aos="zoom-in"  data-aos-delay="150">
      </div>
      <button type="submit" class="btn__results" data-aos="zoom-out"  data-aos-delay="250">See final results</button>
   </form>
</section>`;

  quizContainer.innerHTML = inputNameSaveHtml;
}
