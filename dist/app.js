"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const card = document.querySelector(".card");
const buttons = document.querySelector(".buttons");
// ↓ Функция по отображению информацию из сервера
function showData() {
    const data = fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then((response) => response.json())
        .then((el) => el.results);
    return data;
}
// ↓ Функция по отображению информации первого элемента
function showFirstCard() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstItem = yield showData();
        firstItem.forEach((item) => buttons.append(createButton(item)));
        fetch(firstItem[0].url)
            .then((response) => response.json())
            .then((el) => showInfo(el));
    });
}
showFirstCard();
// ↓ Функция по отображению информации по нажатию на кнопки
function showItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataItems = yield showData();
        const button = document.querySelectorAll(".button");
        dataItems.forEach((item, index) => __awaiter(this, void 0, void 0, function* () {
            const info = yield fetch(item.url)
                .then((response) => response.json())
                .then((el) => el);
            button[index].addEventListener("click", () => {
                card.innerHTML = "";
                showInfo(info);
            });
        }));
    });
}
showItems();
// ↓ Функция по созданию и отображению карточки с информацией
function showInfo(el) {
    card.innerHTML = `
      <p class="card__name">${el.name.charAt(0).toUpperCase() + el.name.slice(1)}</p>
      <img class="card__image" src=${el.sprites.front_shiny} alt=${el.name}/>
      <div>
       <p>Снялся в ${el.moves.length} сериях</p>
       <p>Id: ${el.id}</p>
       <p>height: ${el.height}</p>
       <p>attack: ${el.stats[0].base_stat}</p>
      </div>`;
}
// ↓ Функция по созданию и отображению кнопок
function createButton(item) {
    let button = document.createElement("div");
    button.innerHTML = `
  <button class="button">${item.name}</button>`;
    return button;
}
