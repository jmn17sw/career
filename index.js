// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2505-ftb-et-web-ft-JohnN"; // Make sure to change this!
const API = BASE + COHORT;


const state = {
  artists: [],
  selectedArtist: []
}

async function getArtists() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    artists = result.data;
    render();
  } catch(e) {
    console.error(e);
  }
}


async function getArtist(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedArtist = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

function ArtistListItem(artist) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href="#selected">${artist.name}</a>
  `;
  $li.addEventListener("click", () => getArtist(artist.id));
  return $li;
}

function ArtistList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $artists = selectedArtists.map(ArtistListItem);
  $ul.replaceChildren(...$artists)

  return $ul;
}

function ArtistDetails() {
  if (!selectedArtist) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more."
    return $p;
  }
const $artist = document.createElement("section");
$artist.classList.add("artist");
$artist.innerHTML = `
   <h3>${selectedArtist.name} #${selectedArtist.id}</h3>
    <figure>
      <img alt=${selectedArtist.name} src=${selectedArtist.imageUrl} />
    </figure>
    <p>${selectedArtist.description}</p>
    <button>Remove artist</button>
`;
return $artist;

}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Gala Admin</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <ArtistList></ArtistList>
        <h3>Invite a new artist</h3>
        <NewArtistForm></NewArtistForm>
      </section>
      <section id="selected">
        <h2>Artist Details</h2>
        <ArtistDetails></ArtistDetails>
      </section>
    </main>
  `;
  $app.querySelector("ArtistList").replaceWith(ArtistList());
  $app.querySelector("NewArtistForm").replaceWith(NewArtistForm());
  $app.querySelector("ArtistDetails").replaceWith(ArtistDetails());
}

async function init() {
  await getArtists();
  render();
}
