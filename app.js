document.addEventListener("DOMContentLoaded", () => {
  const click_doc = document.querySelector("block_one-card");
  if (click_doc) {
    console.log("12");
    click_doc.addEventListener("click", handler);
  }
});

console.log("Скрипт на открытие окна загружен!!!");
