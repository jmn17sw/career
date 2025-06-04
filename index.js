// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2505-JohnN"; // Make sure to change this!
const RESOURCE = "/players"
const API = BASE + COHORT + RESOURCE;
const div = "app";

const state = {
  players: [],
  selectedPlayer: {},
  teams: [],
  bench: [],
  field: []
}

async function getPlayers() {
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

async function addPlayer(player) {
  try {
  const response = await fetch(API, {method:"POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(player)});
  const result = await response.json();
  console.log(result)
  getPlayers ();
} catch(e) {
  console.log(e);
}
}


async function removePlayer(id) {
  try {
    const response = await fetch(API, {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(artist)});
    const result = await response.json();
    console.log(result);
    removePlayer();
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
// console.log(state);
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

$player.addEventListener('click', async () => {
  removePlayer(state.selectedPlayer.name)
});
return $player;
}

function NewPlayerForm() {
  const $form = document.createElement("form");
    $form.innerHTML = `
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Breed
        <input breed="breed" required />
      </label>
      <label>
        Profile Picture
        <input name"imageUrl" required />
      </label>
      <button>Get in the Game!</button>    
    `;
    /////////////
  //add event event listener for when user clicks the button
  //grab input name
  //grab input breed
  //grab input profile picture
  //make a post request to add a puppy

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    addPlayer(state.selectedPlayer.name)
    console.log(state.selectedPlayer.name)
  });
///////////////////////////////////
  return $form;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Pupp Bowl!</h1>
    <main>
      <section>
        <h2>Roster</h2>
        <PlayerList></PlayerList>
        <h3>Register New Competitior</h3>
        <NewPlayerForm><NewPlayerForm>
      </section>
      <section id="selected">
        <h2>Player Details</h2>
        <PlayerDetails></PlayerDetails>
      </section>
    </main>
  `;
  $app.querySelector("PlayerList").replaceWith(PlayerList());
  $app.querySelector("NewPlayerForm").replaceWith(NewPlayerForm());
  $app.querySelector("PlayerDetails").replaceWith(PlayerDetails());
}

async function init() {
  await getPlayers();
  render();
}

init();