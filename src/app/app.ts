const card = <HTMLElement>document.querySelector(".card");
const buttons = <HTMLElement>document.querySelector(".buttons");

// ↓ Типы данных вложенных элементов массива объектов из сервера
interface Data {
  name: string;
  url: string;
}

// ↓ Типы данных вложенных элементов массива объектов из сервера для отрисовки информации
interface Info {
  name: string;
  sprites: { front_shiny: string };
  moves: string;
  id: string;
  height: string;
  stats: Array<{ base_stat: number }>;
}

// ↓ Функция по отображению информацию из сервера
function showData() {
  const data = fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    .then((response) => response.json())
    .then((el) => el.results);
  return data;
}

// ↓ Функция по отображению информации первого элемента
async function showFirstCard() {
  const firstItem = await showData();
  firstItem.forEach((item: Data) => buttons.append(createButton(item)));
  fetch(firstItem[0].url)
    .then((response) => response.json())
    .then((el) => showInfo(el));
}
showFirstCard();

// ↓ Функция по отображению информации по нажатию на кнопки
async function showItems() {
  const dataItems = await showData();
  const button = <NodeListOf<HTMLElement>>document.querySelectorAll(".button");

  dataItems.forEach(async (item: Data, index: any) => {
    const info = await fetch(item.url)
      .then((response) => response.json())
      .then((el) => el);
    button[index].addEventListener("click", () => {
      card.innerHTML = "";
      showInfo(info);
    });
  });
}
showItems();

// ↓ Функция по созданию и отображению карточки с информацией
function showInfo(el: Info) {
  card.innerHTML = `
      <p class="card__name">${
        el.name.charAt(0).toUpperCase() + el.name.slice(1)
      }</p>
      <img class="card__image" src=${el.sprites.front_shiny} alt=${el.name}/>
      <div>
       <p>Снялся в ${el.moves.length} сериях</p>
       <p>Id: ${el.id}</p>
       <p>height: ${el.height}</p>
       <p>attack: ${el.stats[0].base_stat}</p>
      </div>`;
}

// ↓ Функция по созданию и отображению кнопок
function createButton(item: Data) {
  let button = document.createElement("div");
  button.innerHTML = `
  <button class="button">${item.name}</button>`;
  return button;
}