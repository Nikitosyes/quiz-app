import { renderMainPage } from "./renderSection/renderMainPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { finishedGames } from "./SectionsLogic/finishedGames";

export const quizContainer = document.querySelector(".quiz");

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 600,
    once: true,
    easing: "ease",
  });

  renderMainPage();

  console.log(finishedGames);
});
