import { quizContainer } from "../main";
import {
  showFinishedGamesBtnClick,
  startQuizBtnClick,
} from "../SectionsLogic/mainPageLogic";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import imagePortraitConceptualization from "../../../public/img/mainPage/PortraitConceptualization.webp";
import PortraitVisualCalculus from "../../../public/img/mainPage/PortraitVisualCalculus.webp";
import PortraitRhetoric from "../../../public/img/mainPage/Portrait_rhetoric.webp";
import PortraitLogic from "../../../public/img/mainPage/Portrait_rhetoric.webp";
import PortraitInlandEmpire from "../../../public/img/mainPage/Portrait_inland-empire.webp";
import PortraitEncyclopedia from "../../../public/img/mainPage/Portrait_encyclopedia.webp";
import PortraitDrama from "../../../public/img/mainPage/Portrait_drama_rank1.webp";

export function renderMainPage() {
  quizContainer.classList.add("no-padding-on-mobile");

  let mainPageHtml = `  
          <section class="quiz__main main shown "> 
           <div class="swiper main__img action" data-aos="zoom-out-up">
             <div class="swiper-wrapper">
             <div class="swiper-slide swiper-slide-no-swiping"><img src="${imagePortraitConceptualization}" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"> <img src="${PortraitInlandEmpire}" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="${PortraitDrama}" alt=""></div>               
               <div class="swiper-slide swiper-slide-no-swiping"><img src="${PortraitEncyclopedia}" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="${PortraitLogic}" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="${PortraitRhetoric}" alt=""></div>
               <div class="swiper-slide swiper-slide-no-swiping"><img src="${PortraitVisualCalculus}" alt=""></div>
             </div>
           </div>
             <div class="main__selections">
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
