import { backToMainMenu } from "../SectionsLogic/mainPageLogic";
import { quizContainer } from "../main";
import {
  finishedGames,
  saveFinishedGamesInLocalStorage,
} from "../SectionsLogic/finishedGames";

let indexForRender = 0;
export function updateIndexForRender(newValue) {
  if (typeof newValue === "number") {
    indexForRender = newValue;
  } else {
    console.error("Argument must be a number.");
  }
}

let globalIndex = 1;
export function updateGlobalIndex(newValue) {
  if (typeof newValue === "number") {
    globalIndex = newValue;
  } else {
    console.error("Argument must be a number.");
  }
}

const gamesPerPage = 5;

export function renderFinishedGamesSection() {
  let finisheGamesHtml = `
  <section class="quiz__finished-games finished-games">
  <div class="finished-games__top">
    <i class="fa-solid fa-circle-left go-back-main-from-finished_games"></i>
    <div class="finished-games__heading">Finished games</div>
  </div>
  <div class="finished-games__content">
    <div class="finished-games__grid">
    </div>
    <div class="finished-games__go-to-main">
      <button data-action="go-to-main" type="button">Go to main page</button>
      <button data-action="load-more-finished-games" type="button">Load more previous games</button>
    </div>
  </div>
</section>
`;

  quizContainer.innerHTML = finisheGamesHtml;

  const goBackArrow = document.querySelector(
    ".go-back-main-from-finished_games"
  );
  const goBackMainBtn = document.querySelector('[data-action="go-to-main"]');

  goBackArrow.addEventListener("click", backToMainMenu);
  goBackMainBtn.addEventListener("click", backToMainMenu);
  updateIndexForRender(0);
  updateGlobalIndex(1);
  renderFinishedGames();
  updateLoadMoreFinishedGamesVisibility();
  const addMoreFinishedGamesBtn = document.querySelector(
    '[data-action="load-more-finished-games"]'
  );
  addMoreFinishedGamesBtn.addEventListener("click", () => {
    loadMoreFinishedGames();
  });
}

export function renderFinishedGames() {
  const finishedGamesContainer = document.querySelector(
    ".finished-games__grid"
  );

  if (finishedGames.length === 0) {
    finishedGamesContainer.innerHTML = `<p class="no-quiz-played">You haven't finished any quiz yet</p>`;
    return;
  }

  const finishedGamesToRenderSliced = finishedGames.slice(
    indexForRender,
    indexForRender + gamesPerPage
  );

  let finishedGamesHtml = "";

  finishedGamesToRenderSliced.forEach((game) => {
    const finishedGameHtml = `
    <div class="finished-games__places" data-id="${game.id}">
    <p><span class="finished-game__circle"><span class="finished-game__index">${globalIndex++}</span></span>Player:<span class="finished-game__name"> ${
      game.playerName
    }</span>, correct answers: <span class="finished-game__correct-answers">${
      game.correctAnswers
    } </span>out of ${
      game.totalQuestions
    } in category - <span class="finished-game__category">${
      game.category
    }</span>, difficulty - <span class="finished-game__difficulty">${
      game.difficulty
    }</span>; finished on <span class="finished-game__date-of-game">${
      game.date
    }</span>.</p> <span class="finished-game__remove"  data-index="${
      globalIndex - 1
    }">remove</span>
     </div>  `;

    finishedGamesHtml += finishedGameHtml;
  });

  finishedGamesContainer.innerHTML += finishedGamesHtml;
  updateLoadMoreFinishedGamesVisibility();
  finishedGamesContainer.addEventListener("click", handleRemoveGameClicked);
}

async function handleRemoveGameClicked(e) {
  const deleteGameBtn = e.target.closest(".finished-game__remove");

  if (deleteGameBtn) {
    const howManyGamesRendered = document.querySelectorAll(
      ".finished-games__places"
    ).length;
    const playedGameToRemove = deleteGameBtn.closest(".finished-games__places");
    const playedGameToRemoveId = playedGameToRemove.dataset.id;

    const playedGameToRemoveIndex = finishedGames.findIndex(
      (game) => game.id === playedGameToRemoveId
    );

    if (playedGameToRemoveIndex !== -1) {
      finishedGames.splice(playedGameToRemoveIndex, 1);
      saveFinishedGamesInLocalStorage();
      // updateIndexForRender(howManyGamesRendered - 1);
      updateGlobalIndex(1);
      renderFinishedGamesOnDelete(howManyGamesRendered);
    }
  }
}

function renderFinishedGamesOnDelete(arrLength) {
  const finishedGamesContainer = document.querySelector(
    ".finished-games__grid"
  );

  if (finishedGames.length === 0) {
    finishedGamesContainer.innerHTML = `<p class="no-quiz-played">You haven't finished any quiz yet</p>`;
    return;
  }

  const finishedGamesToRenderSliced = finishedGames.slice(0, arrLength);

  finishedGamesContainer.innerHTML = "";
  let finishedGamesHtml = "";

  finishedGamesToRenderSliced.forEach((game) => {
    const finishedGameHtml = `
    <div class="finished-games__places" data-id="${game.id}">
    <p><span class="finished-game__circle"><span class="finished-game__index">${globalIndex++}</span></span>Player:<span class="finished-game__name"> ${
      game.playerName
    }</span>, correct answers: <span class="finished-game__correct-answers">${
      game.correctAnswers
    } </span>out of ${
      game.totalQuestions
    } in category - <span class="finished-game__category">${
      game.category
    }</span>, difficulty - <span class="finished-game__difficulty">${
      game.difficulty
    }</span>; finished on <span class="finished-game__date-of-game">${
      game.date
    }</span>.</p> <span class="finished-game__remove"  data-index="${
      globalIndex - 1
    }">remove</span>
     </div>  `;

    finishedGamesHtml += finishedGameHtml;
  });

  finishedGamesContainer.innerHTML = finishedGamesHtml;
  updateLoadMoreFinishedGamesVisibility();
  finishedGamesContainer.addEventListener("click", handleRemoveGameClicked);
}

function loadMoreFinishedGames() {
  indexForRender += gamesPerPage;

  updateLoadMoreFinishedGamesVisibility();
  renderFinishedGames();
}

function updateLoadMoreFinishedGamesVisibility() {
  const addMoreFinishedGamesBtn = document.querySelector(
    '[data-action="load-more-finished-games"]'
  );

  const remainingGames = finishedGames.length - (indexForRender + gamesPerPage);

  if (remainingGames >= 1) {
    addMoreFinishedGamesBtn.style.display = "";
  } else {
    addMoreFinishedGamesBtn.style.display = "none";
  }
}
