import { renderCategoriesSection } from "../renderSection/renderCategories";
import { renderChooseDifficulty } from "../renderSection/renderChooseDifficulty";


export function setUpCategoryButtonClicked() {
  const categoryButtons = document.querySelectorAll(
    ".categories__selections button"
  );

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoryId = btn.getAttribute("data-id");
      renderChooseDifficulty(categoryId);
    });
  });
}

export function backToCategories() {
  renderCategoriesSection();
}
