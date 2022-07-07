var all = document.getElementsByTagName("*");

if (localStorage.getItem("language") == null) {
  localStorage.setItem("language", "english");
}

const changeLanguage = (isLoad) => {
  if (isLoad) {
    document.querySelector(".spanish-button").innerText = "English";
    localStorage.setItem("language", "spanish");
    all.forEach((elm) => {
      if (elm.innerText != null && elm.hasAttribute("data-spanish")) {
        if (elm.getAttribute("data-english") == null)
          elm.setAttribute("data-english", elm.innerText);
        elm.innerText = elm.getAttribute("data-spanish");
      }
    });
    return;
  }
  if (localStorage.getItem("language") == "english") {
    document.querySelector(".spanish-button").innerText = "English";
    localStorage.setItem("language", "spanish");
    all.forEach((elm) => {
      if (elm.innerText != null && elm.hasAttribute("data-spanish")) {
        if (elm.getAttribute("data-english") == null)
          elm.setAttribute("data-english", elm.innerText);
        elm.innerText = elm.getAttribute("data-spanish");
      }
    });
    return;
  }
  localStorage.setItem("language", "english");
  document.querySelector(".spanish-button").innerText = "Español";
  all.forEach((elm) => {
    if (elm.innerText != null && elm.hasAttribute("data-english")) {
      elm.innerText = elm.getAttribute("data-english");
    }
  });
};

if (localStorage.getItem("language") === "spanish") {
  changeLanguage(true);
}

// changeLanguage("spanish");
