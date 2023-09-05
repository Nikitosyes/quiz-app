import { quizContainer } from "../main";

export function renderQuestionsHtml(question, currentQuestionIndex, questions) {
  const answers = [...question.incorrect_answers, question.correct_answer];
  // Shuffle the answers randomly
  answers.sort(() => Math.random() - 0.5);

  const numQuestions = questions.length;
  const rightWrongElements = Array.from({ length: numQuestions }, (index) => {
    return `<div class="right-wrong-answered" data-question-index="${index}"></div>`;
  }).join("");

  const questionsSectionHtml = `  <section class="quiz__questions questions">
   <div class="questions__top">
      <div class="questions__list">
         <span>Question ${
           currentQuestionIndex + 1
         } out of ${numQuestions}</span>
         <!-- span representing the current question  -->
      </div>
      <div class="questions__timer">
         <p>Time Left</p><span></span>
      </div>
      <div class="questions__category">${question.category}</div>
   </div>
   <div class="questions__content">
      <div class="questions__question">${question.question}</div>
      <div class="questions__answers">
      ${answers
        .map(
          (answer, index) => `
           <button type="button" class="questions__answer" data-answer-index="${index}">${answer}</button>
         `
        )
        .join("")}
      </div>
      <div class="questions__right-wrong">
        ${rightWrongElements}
      </div>
      <div class="questions__next">
      </div>
   </div>
</section>`;

  quizContainer.innerHTML = questionsSectionHtml;
}
