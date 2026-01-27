const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("error")) {
  alert(urlParams.get("error"));
}

function showTab(tab) {
  // Скрыть все формы
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.add("hidden");

  // Показать нужную
  document.getElementById(tab + "Form").classList.remove("hidden");

  // Активный таб
  document
    .querySelectorAll('[id$="Tab"]')
    .forEach((btn) =>
      btn.classList.remove(
        "text-blue-500",
        "border-blue-500",
        "text-green-500",
        "border-green-500",
      ),
    );
  if (tab === "login") {
    document
      .getElementById("loginTab")
      .classList.add("text-blue-500", "border-blue-500");
  } else {
    document
      .getElementById("registerTab")
      .classList.add("text-green-500", "border-green-500");
  }
}
