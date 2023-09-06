import { quizContainer } from "../main";
import { showError } from "../utilities/showError";

export async function fetchQuestions(categoryId, difficulty, questionsNumber) {
  const apiUrl = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results;
    } else {
      quizContainer.classList.add("flex-layout");
      showError(
        quizContainer,
        "Error while getting questions occured, pls select another category/difficulty/number of questions"
      );
    }
  } catch (error) {
    console.log("Error fetching questions");
    showError(quizContainer, "Error while getting questions occured");
  }
}
