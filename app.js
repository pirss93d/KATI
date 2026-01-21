const trigger = document.querySelector("#card_1");
const modalBg = document.querySelector(".modalBackground");
const modalClose = document.querySelector(".modalClose");
const body = document.body;
// Открытие

trigger.addEventListener("click", () => {
  modalBg.style.display = "block";
  body.style.overflow = "hidden";
});
// Закрытие по крестику или фону
modalClose.addEventListener("click", () => {
  modalBg.style.display = "none";
  body.style.overflow = "";
});
modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) {
    modalBg.style.display = "none";
    body.style.overflow = "";
  }
});

console.log("Скрипт на открытие окна загружен!!!");
