import { quizContainer } from "../main";
import {
  showFinishedGamesBtnClick,
  startQuizBtnClick,
} from "../SectionsLogic/mainPageLogic";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function renderMainPage() {
  quizContainer.classList.add("no-padding-on-mobile");

  let mainPageHtml = `  
          <section class="quiz__main main shown "> 
           <div class="swiper main__img action" data-aos="zoom-out-up">
             <div class="swiper-wrapper">
             <div class="swiper-slide swiper-slide-no-swiping"><img src="../src/img/mainPage/Portrait_conceptualization_rank1.webp" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"> <img src="./src/img/mainPage/Portrait_inland-empire.webp" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="../../src/img/mainPage/Portrait_drama_rank1.webp" alt=""></div>               
               <div class="swiper-slide swiper-slide-no-swiping"><img src="././src/img/mainPage/Portrait_encyclopedia.webp" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="/src/img/mainPage/Portrait_logic.webp" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="/src/img/mainPage/Portrait_rhetoric.webp" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="/src/img/mainPage/Portrait_visual-calculus_rank1.webp" alt=""></div>
             </div>
           </div>
             <div class="main__selections">`
                <button class="action" data-action="take_a_quiz" type="button">Take a quiz</button>
                <button class="action" data-action="show-finished-games" type="button">Finished
         games</button>
             </div>
       </section>
   `;

  quizContainer.innerHTML = mainPageHtml;

  const takeQuizBtn = document.querySelector(`[data-action="take_a_quiz"]`);
  takeQuizBtn.addEventListener("click", startQuizBtnClick);

  const finishedGamesBtn = document.querySelector(
    '[data-action="show-finished-games"]'
  );
  finishedGamesBtn.addEventListener("click", showFinishedGamesBtnClick);

  const mySwiper = document.querySelector(".swiper ");
  if (mySwiper) {
    setUpSwiper();
  }
}

function setUpSwiper() {
  const mySwiper = new Swiper(".swiper", {
    autoplay: {
      delay: 0,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },

    effect: "cube",
    loop: true,
    speed: 2500,
    noSwiping: true,
    noSwipingClass: "swiper-slide-no-swiping",
  });

  mySwiper.init();
}
