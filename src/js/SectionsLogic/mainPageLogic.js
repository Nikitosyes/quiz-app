import { renderCategoriesSection } from "../renderSection/renderCategories";
import { renderFinishedGamesSection } from "../renderSection/renderFInishedGames";
import { renderMainPage } from "../renderSection/renderMainPage";

export function startQuizBtnClick() {
  renderCategoriesSection();
}

export function showFinishedGamesBtnClick() {
  renderFinishedGamesSection();
}

export function backToMainMenu() {
  renderMainPage();
}
