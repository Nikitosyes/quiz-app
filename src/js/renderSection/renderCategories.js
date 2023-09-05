import { fetchCategories } from "../Request/fetchCategories";
import { backToMainMenu } from "../SectionsLogic/mainPageLogic";
import { quizContainer } from "../main";
import { setUpCategoryButtonClicked } from "../SectionsLogic/categoriesSectionLogic";

export function renderCategoriesSection() {
  let categoriesSectionHtml = `
       <section class="quiz__categories categories">
         <div class="categories__top">
             <i class="fa-solid fa-circle-left go-back go-back-main" ></i>
             <div class="categories__heading">Select category</div>
         </div>
        <div class="categories__selections">
        </div>
       </section>
`;

  quizContainer.innerHTML = categoriesSectionHtml;

  renderCategoriesSelection();

  let goBackMainBtn = document.querySelector(".go-back-main");
  goBackMainBtn.addEventListener("click", backToMainMenu);
}

export async function renderCategoriesSelection() {
  const categories = await fetchCategories();
  const categoriesContainer = document.querySelector(".categories__selections");

  let categoriesBtnsHtml = "";

  categories.forEach((category) => {
    let categoryBtnHtml = `<button data-id="${category.id}" data-aos="fade-up" type="button">${category.name}</button>`;
    categoriesBtnsHtml += categoryBtnHtml;
  });

  categoriesContainer.innerHTML += categoriesBtnsHtml;
  setUpCategoryButtonClicked();
}
