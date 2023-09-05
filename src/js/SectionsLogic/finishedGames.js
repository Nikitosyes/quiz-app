export let finishedGames =
  JSON.parse(localStorage.getItem("finished-games")) || [];

export function saveFinishedGamesInLocalStorage() {
  localStorage.setItem("finished-games", JSON.stringify(finishedGames));
}
