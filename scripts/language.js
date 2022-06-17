var all = document.getElementsByTagName("*");

const changeLanguage = (lang) => {
  if (lang === "spanish") {
    all.forEach((elm) => {
      if (elm.innerText != null && elm.hasAttribute("data-spanish")) {
        if (elm.getAttribute("data-english") == null)
          elm.setAttribute("data-english", elm.innerText);
        elm.innerText = elm.getAttribute("data-spanish");
      }
    });
  }
  if (lang === "english") {
    all.forEach((elm) => {
      if (elm.innerText != null && elm.hasAttribute("data-english")) {
        elm.innerText = elm.getAttribute("data-english");
      }
    });
  }
};

// changeLanguage("spanish");
