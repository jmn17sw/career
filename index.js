// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2505-JohnN"; // Make sure to change this!
const RESOURCE = "/players"
const API = BASE + COHORT + RESOURCE;
const div = "app";

const state = {
  players: [],
  selectedPlayer: null,
  teams: [],
  bench: [],
  field: []
}

async function GetPlayers() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    state.players = result.data.players;
    render();
  } catch(e) {
    console.error(e);
  }
}


async function getPlayer(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    state.selectedPlayer = result.data.player;
    render();
  } catch (e) {
    console.error(e);
  }
}

function PlayerListItem(player) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href="#selected">${player.name}</a>
  `;
  $li.addEventListener("click", () => getPlayer(player.id));
  return $li;
}

function PlayerList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("Roster");
console.log(state);
  const $players = state.players.map(PlayerListItem);
  $ul.replaceChildren(...$players)

  return $ul;
}

function PlayerDetails() {
  if (!state.selectedPlayer) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a player to learn more."
    return $p;
  }
const $player = document.createElement("section");
$player.classList.add("player");
$player.innerHTML = `
   <h3>${state.selectedPlayer.name} #${state.selectedPlayer.id}</h3>
    <figure>
      <img alt=${state.selectedPlayer.name} src=${state.selectedPlayer.imageUrl} />
    </figure>
    <p>${state.selectedPlayer.description}</p>
    <button>Remove player</button>
`;
return $player;

}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Pupp Bowl!</h1>
    <main>
      <section>
        <h2>Roster</h2>
        <PlayerList></PlayerList>
      </section>
      <section id="selected">
        <h2>Player Details</h2>
        <PlayerDetails></PlayerDetails>
      </section>
    </main>
  `;
  $app.querySelector("PlayerList").replaceWith(PlayerList());

  $app.querySelector("PlayerDetails").replaceWith(PlayerDetails());
}

async function init() {
  await GetPlayers();
  render();
}

init();