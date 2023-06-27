const quoteTextEl = document.querySelector(".quote-text");
const quoteAuthorEl = document.querySelector(".quote-author");
const randomQuoteEl = document.querySelector(".random__quote");
const inputEl = document.querySelector(".search__input");
const searchIconEl = document.querySelector(".search__icon");
const optionsEl = document.querySelector(".select-language");
const resultTextEl = document.querySelector(".result__text");
const formSelectEl = document.querySelector(".form__search");
const selectLanguage = document.querySelector(".select-language");
const resultHeadingEl = document.querySelector(".result__heading");
const inputThemeEl = document.querySelector(".input");
const bodyEl = document.querySelector("body");
const menuIconEl = document.querySelector(".header__menu--icon");
const paperMenuEl = document.querySelector(".header__paper--menu ");
const appEl = document.querySelector(".app");
const modalContainerEl = document.querySelector(".modal__container");
const modalMenuIcon = document.querySelector(".modal__icon--close");

// api getquote
const apiKeyQuote = "bfl8z5tjbRnN60QxdZprDPd8cpXOf0aQD4Eu3zvO";
const category = "happiness";
const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
const options = {
  method: "GET",
  headers: { "X-Api-Key": apiKeyQuote },
  contentType: "application/json",
  success: function (result) {
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
};

async function getQuote() {
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    quoteTextEl.innerText = data[0].quote;
    quoteAuthorEl.innerText = data[0].author;
  } catch (error) {
    // console.log(error);
  }
}
getQuote();
randomQuoteEl.addEventListener("click", getQuote);

async function fetchDictionary(value) {
  resultHeadingEl.innerText = "Đang dịch...";
  const selectOption = optionsEl.value;
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "420e0a031amsh6ce33aa56b81f45p1feb8cjsnde5ededbc0fe",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: "auto",
      target_language: selectOption,
      text: value,
    }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    resultHeadingEl.innerText = "";
    resultTextEl.innerText = result.data.translatedText;
  } catch (error) {
    // console.error(error);
  }
}

inputThemeEl.checked = JSON.parse(localStorage.getItem("mode"));

updateBody();

function updateBody() {
  if (inputThemeEl.checked) {
    bodyEl.style.backgroundColor = "#121212";
  } else {
    bodyEl.style.backgroundColor = "";
  }
}

function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputThemeEl.checked));
}

function handleOpenMenu() {
  modalContainerEl.style.display = "block";
}

function handleCloseMenu() {
  modalContainerEl.style.display = "none";
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter" && e.which === 13) {
    fetchDictionary(e.target.value);
  }
  if (e.target.value === "") {
    setTimeout(() => {
      resultTextEl.innerText = "";
    }, 1000);
  }
});

searchIconEl.addEventListener("click", (e) => {
  fetchDictionary(inputEl.value);
});

formSelectEl.addEventListener("submit", (e) => {
  e.preventDefault();
});
selectLanguage.addEventListener("change", (e) => {
  fetchDictionary(inputEl.value);
});
inputThemeEl.addEventListener("click", () => {
  updateBody();
  updateLocalStorage();
});
menuIconEl.addEventListener("click", handleOpenMenu);
modalMenuIcon.addEventListener("click", handleCloseMenu);
