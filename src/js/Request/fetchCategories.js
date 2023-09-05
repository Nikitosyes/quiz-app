import { quizContainer } from "../main";
import { showError } from "../utilities/showError";

export async function fetchCategories() {
  const apiUrl = "https://opentdb.com/api_category.php";
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const categories = data.trivia_categories;
    return categories;
  } catch (error) {
    console.log("Error fetcing categories");
    showError(quizContainer, "No categories found, error occured");
  }
}
