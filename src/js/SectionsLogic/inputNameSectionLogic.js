import { quizContainer } from "../main";
import { renderSaveResultsNameInput } from "../renderSection/renderSaveResultsInput";
import { clearHtmlForItem } from "../utilities/clearHtmlForItem";
import { setUpNameInputValidationLogic } from "./validationLogicForNameInput";

export function setUpGoToResultsNameBtnClick(questions) {
    clearHtmlForItem(quizContainer);
    renderSaveResultsNameInput();
    setUpNameInputValidationLogic(questions);
}
