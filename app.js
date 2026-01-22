const modal = document.getElementById("modal");
const openBtn = document.getElementById("card_1"); //Кнопка (Документы)
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.classList.add("active");
closeBtn.onclick = () => modal.classList.remove("active");

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("active");
};

document.onkeydown = (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
};

// Блокировка скролла body
function lockScroll() {
  document.body.style.overflow = modal.classList.contains("active")
    ? "hidden"
    : "";
}
modal.addEventListener("transitionend", lockScroll);

console.log("Скрипт на открытие окна загружен!!!");
