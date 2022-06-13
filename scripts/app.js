const radio = $(".radio");
let music, source, loader, playButton, pauseButton, storageVolume, volume;
const d = new Date();
const t = new Date(d);
t.setDate(t.getDate() + 1);
const tomorrowsDate = t.toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
});
let day = d.getDay();
let radioContentLoaded = false;

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete" && radioContentLoaded === false) {
    radioContentLoaded = true;
    if (day === 1) {
      radio.addClass("radio--visible");
      radio.append(`<div class="radio__image" alt="El Show Del Potro Art"></div><div class="radio__right">
      Brian will be live on El Show Del Potro tomorrow, <br>${tomorrowsDate}!<br><br>
      Tune in to <a href="https://www.lagrandsaltlake.com/shows/el-show-del-potro/">LA Grand 102.3 FM</a> from 10am-11am to listen!
      </div>`);
    }

    if (day === 2) {
      function convertTZ(date, tzString) {
        return new Date(
          (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: "America/Denver" }
          )
        );
      }

      const date = new Date();
      const convertedDate = convertTZ(date, "America/Denver");
      const curHours = convertedDate.getHours();

      // if (curHours === 10) {
      radio.append(`<div class="radio__image" alt="El Show Del Potro Art"></div>
      <div class="radio__right">
          <div class="radio--name">Brian is live on El Show Del Potro!<br>Listen now:</div>
          <button onclick="runMusic()" class="radio__button">
              <div class="radio__load radio--hidden">
              <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg></div>
              <ion-icon name="play" class="radio__play"></ion-icon>
              <ion-icon name="pause" class="radio__pause radio--hidden"></ion-icon>
          </button>
          <div class="radio__volume">
          <button>
              <ion-icon name="volume-high-outline" class="volume-high-outline"></ion-icon>
              <ion-icon name="volume-medium-outline" class="volume-medium-outline radio--hidden"></ion-icon>
              <ion-icon name="volume-low-outline" class="volume-low-outline radio--hidden"></ion-icon>
              <ion-icon name="volume-off-outline" class="volume-off-outline radio--hidden"></ion-icon>
              <ion-icon name="volume-mute-outline" class="volume-mute-outline radio--hidden"></ion-icon>
          </button>
          <input type="range" id="volume-control">
          </div>
          <audio id="music" preload="all">
              <source src="">
          </audio>
          </div>`);
      music = document.getElementById("music");
      source = document.querySelector("#music > source");
      loader = $(".radio__load");
      playButton = $(".radio__play");
      pauseButton = $(".radio__pause");
      storageVolume = 0.5;
      volume = document.querySelector("#volume-control");
      volume.addEventListener("input", (e) => {
        music.volume = e.currentTarget.value / 100;
        localStorage.setItem("radio_volume", e.currentTarget.value / 100);
      });
      radio.addClass("radio--visible");
      if (localStorage.getItem("radio_volume")) {
        storageVolume = localStorage.getItem("radio_volume");
        volume.value = localStorage.getItem("radio_volume") * 100;
      }
      // }
    }
  }
});

function runMusic() {
  if (radio.hasClass("radio--active")) {
    radio.removeClass("radio--active");
    pauseButton.addClass("radio--hidden");
    playButton.removeClass("radio--hidden");
    music.pause();
    setTimeout(() => {
      music.load();
      source.src = "";
      return;
    });
    return;
  }

  radio.addClass("radio--active");
  source.src =
    "https://live.wostreaming.net/direct/alphacorporate-kdutfmaac-ibc4?source=TuneIn&gdpr=0&us_privacy=1YNY";
  music.load();
  music.volume = 0;
  music.play();
  playButton.addClass("radio--hidden");
  loader.removeClass("radio--hidden");

  let loaded = false;
  let lastFire = 0;
  let curFire;

  function timeUpdateListener() {
    if (loaded === false) {
      curFire = new Date().getTime() / 1000;

      if (curFire - lastFire <= 0.75) {
        loaded = true;
        return;
      }

      lastFire = curFire;
      return;
    }
    music.volume = storageVolume;
    loader.addClass("radio--hidden");
    pauseButton.removeClass("radio--hidden");
    music.removeEventListener("timeupdate", timeUpdateListener, false);
  }

  music.addEventListener("timeupdate", timeUpdateListener, false);

  return;
}

function closeRadio() {
  if (radio.hasClass("radio--active")) runMusic();
  radio.removeClass("radio--visible");
}

const queryParams = window.location.search.slice(1).split("&");
let captcha = false;
let captchaVisible = false;
let formHasSubmitted = false;

$(".accessibility-menu-button").on("click", () => {
  if ($(".accessibility-menu").hasClass("menu-hidden")) {
    $(".accessibility-menu").removeClass("menu-hidden");
    $(".accessibility-menu").css("pointer-events", "all");
    return;
  }
  if (!$(".accessibility-menu").hasClass("menu-hidden")) {
    $(".accessibility-menu").addClass("menu-hidden");
    $(".accessibility-menu").css("pointer-events", "none");
    return;
  }
});

$(".skip-to-content").on("focus", () => {
  $(".accessibility-menu").removeClass("menu-hidden");
});

$("body").on("click", (e) => {
  if (
    e.target.parentElement.classList.contains("accessibility-menu-button") ||
    e.target.classList.contains("accessibility-menu-button") ||
    e.target.classList.contains("accessibility-menu") ||
    e.target.parentElement.classList.contains("accessibility-menu")
  ) {
    return;
  }

  if ($(".options-wrapper").hasClass("select-menu-active")) {
    $(".options-wrapper").removeClass("select-menu-active");
  }

  if (!$(".accessibility-menu").hasClass("menu-hidden")) {
    $(".accessibility-menu").addClass("menu-hidden");
  }
});

$("html").on("keydown", (e) => {
  if (e.key === "Escape") {
    if (!$(".accessibility-menu").hasClass("menu-hidden")) {
      $(".accessibility-menu").addClass("menu-hidden");
    }
  }
});

const closeAccessButton = () => {
  $(".accessibility-menu").addClass("menu-hidden");
  $(".landing-text-l1").focus();
};

const runSwitchPractice = (b, e) => {
  if (e.target.classList.contains("pb-active")) {
    return;
  }

  const activeButton = $(".pb-active").attr("class").split(" ")[1];
  $(`.${activeButton}-content`).addClass("p-opacity-0");

  setTimeout(() => {
    $(`.${activeButton}-content`).addClass("p-hidden");

    $(`.${b}-content`).removeClass("p-hidden");
    setTimeout(() => {
      $(`.${b}-content`).removeClass("p-opacity-0");
    }, 50);
  }, 600);

  $(".pb-active").removeClass("pb-active");
  e.target.classList.add("pb-active");
};

const openMobNav = () => {
  if (!$(".side-menu").hasClass("mob-nav-hidden")) {
    return;
  }

  $(".side-menu").removeClass("mob-nav-hidden");
  $("body").css("overflow", "hidden");
  return;
};

const closeMobNav = (t) => {
  if (t == null) {
    $(".side-menu").addClass("mob-nav-hidden");
    $("body").css("overflow", "unset");
    return;
  }

  if (t === window.location.pathname) {
    if ($(".side-menu").hasClass("mob-nav-hidden")) {
      return;
    }

    $(".side-menu").addClass("mob-nav-hidden");
    $("body").css("overflow", "unset");
    return;
  }
};

const hideAccess = (e) => {
  if (e[0].isIntersecting) {
    $(".accessibility").addClass("access-hidden");
    setTimeout(() => {
      if (!$(".accessibility").hasClass("access-hidden")) {
        return;
      }
      $(".accessibility").css("display", "none");
    }, 500);
    return;
  }
  $(".accessibility").removeAttr("style");
  setTimeout(() => {
    $(".accessibility").removeClass("access-hidden");
  }, 100);
  return;
};

const observer = new IntersectionObserver(hideAccess, {
  rootMargin: "150px",
  threshold: 0.1,
});

observer.observe(document.querySelector("footer"));

const activateMenu = (n) => {
  if ($(`.${n}`).hasClass("access-active")) {
    switch (n) {
      case "high-contrast":
        $(":root").css("--main-blue", "#72B0D5");
        $(":root").css("--dbackground-blue", "#4A5362");
        $(":root").css("--dark-blue", "#1E283B");
        break;
    }
    $(`.${n}`).toggleClass("access-active");
    return;
  } else {
    switch (n) {
      case "high-contrast":
        $(":root").css("--main-blue", "#4D788E");
        $(":root").css("--dbackground-blue", "#272C33");
        $(":root").css("--dark-blue", "#1E1E1E");
        break;
    }
    $(`.${n}`).toggleClass("access-active");
    return;
  }
};

const openSelectMenu = (b) => {
  const closeMenu = () => {
    if ($(".options-wrapper").hasClass("select-menu-active")) {
      $(".options-wrapper").removeClass("select-menu-active");
      setTimeout(() => {
        $(".options-wrapper").css("display", "none");
        $(".options-wrapper").css("pointer-events", "none");
      }, 500);
      return;
    }
  };

  if (b) {
    closeMenu();
    return;
  }

  if ($(".options-wrapper").hasClass("select-menu-active")) {
    closeMenu();
    return;
  }

  if (
    !$(".options-wrapper").hasClass("select-menu-active") &&
    $(".options-wrapper").css("display") === "unset"
  ) {
    return;
  }

  $(".options-wrapper").css("display", "unset");
  setTimeout(() => {
    $(".options-wrapper").addClass("select-menu-active");
    setTimeout(() => {
      $(".options-wrapper").css("pointer-events", "unset");
    }, 300);
  }, 50);
};

const selectOption = (e) => {
  const tar = e.target.classList[1];
  let tarVal;
  switch (tar) {
    case "pi":
      tarVal = "personal-injury";
      break;
    case "wd":
      tarVal = "wrongful-death";
      break;
    case "im":
      tarVal = "immigration";
      break;
    case "cd":
      tarVal = "criminal-defense";
      break;
  }
  $("#input-case-type").val(tarVal).change();

  openSelectMenu(true);
};

const captchaCallback = (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    token: token,
  });
  fetch("https://mystical-glass-351915.wm.r.appspot.com/captcha", {
    method: "POST",
    headers: myHeaders,
    body: raw,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        captcha = true;
      }
    });
};

const checkForm = (e) => {
  e.preventDefault();

  if (formHasSubmitted) {
    return;
  }

  formHasSubmitted = true;
  let nameError = false;
  let phoneError = false;
  const name = $("#input-name").val();
  const email = $("#input-email").val();
  const phone = $("#input-phone").val();
  const caseType = $("#input-case-type").val();
  const textArea = $("#input-textarea").val();
  const message = $("#input-message");
  const honeyPot = $("#input-honeypot").val();

  message.val(textArea);

  let errorMessage = "";

  const addToMessage = (m) => {
    if (errorMessage == "") {
      errorMessage = m;
      return;
    }

    errorMessage = `${errorMessage}<br>${m}`;
    return;
  };

  try {
    if (captcha === false) {
      addToMessage("* Please complete the reCAPTCHA.");
    }

    if (name.length === 0) {
      addToMessage("* Please enter your name.");
      nameError = true;
    }

    if (
      name.match(/(?!\s|-|\p{L})\W|\d/gm) != undefined &&
      nameError === false
    ) {
      const matched = name.match(/(?!\s|-|\p{L})\W|\d/gm);
      let matchedLines = "";

      for (let i = 0; i < matched.length; i++) {
        if (matched.length > 1) {
          if (i === 0) {
            matchedLines = matched[i];
            continue;
          }
          if (i === matched.length - 1) {
            matchedLines = `${matchedLines} and ${matched[i]}`;
            break;
          }
          matchedLines = `${matchedLines}, ${matched[i]}`;
          continue;
        }
        matchedLines = matched[i];
        break;
      }
      addToMessage(`* Please remove ${matchedLines} from the name box.`);
      nameError = true;
    }

    if (email.match(/\w{1,}@[a-zA-Z0-9\-]{1,}.\w{1,}/gm) == undefined) {
      if (email.length === 0) {
        addToMessage("* Please enter your email.");
      } else {
        addToMessage("* Please enter a valid email.");
      }
    }

    if (phone.match(/[a-zA-Z]/gm) != undefined) {
      const matched = phone.match(/[a-zA-Z]/gm);
      let matchedLines = "";

      for (let i = 0; i < matched.length; i++) {
        if (matched.length > 1) {
          if (i === 0) {
            matchedLines = matched[i];
            continue;
          }
          if (i === matched.length - 1) {
            matchedLines = `${matchedLines} and ${matched[i]}`;
            break;
          }
          matchedLines = `${matchedLines}, ${matched[i]}`;
          continue;
        }
        matchedLines = matched[i];
        break;
      }
      addToMessage(
        `* Please remove ${matchedLines} from the phone number box.`
      );
    }

    if (phone.length === 0) {
      addToMessage("* Please enter your phone number.");
      phoneError = true;
    }

    if (phone.match(/\d/g) != undefined && phoneError === false) {
      if (phone.match(/\d/g).length >= 11 || phone.match(/\d/g).length <= 8) {
        addToMessage("* Please enter a valid phone number.");
      }
    } else {
      if (phoneError === false) {
        addToMessage("* Please enter a valid phone number.");
      }
    }

    if (
      message.val().match(/[a-zA-Z]/gm) == undefined ||
      message.val().length == 0
    ) {
      addToMessage("* Please enter a valid message");
    }
  } catch (error) {
    console.log(error);
  }

  if (errorMessage !== "") {
    formHasSubmitted = false;
    $(".error-box").html(errorMessage);
    return;
  }

  $.ajax({
    url: "https://formsubmit.co/ajax/4e91b27ad345e670bb384cebd7b468a0",
    method: "POST",
    data: {
      Name: name,
      Email: email,
      "Phone Number": phone,
      "Case Type": caseType,
      Message: textArea,
      _honey: honeyPot,
      _template: "box",
      _subject: `New message from ${name}`,
    },
    dataType: "json",
  })
    .then((res) => {
      if (res.success === "true") {
        const dForm = document.querySelector("form");
        const height = dForm.offsetHeight;
        $("form").addClass("hidden");
        setTimeout(() => {
          const contUs = $(".contact-us");
          contUs.css("height", height);
          $("form").remove();
          contUs.append(
            `<div class="message-success hidden"><span class="m-line-1">Your message has been recieved.</span><span class="m-line-2">We'll review the details you provided and get back to you as soon as possible.</span><span class="m-line-3">If your message is urgent, please call us at <a href="tel:8014466464">(801) 446-6464</a></span></div>`
          );
          contUs
            .css("display", "flex")
            .css("align-items", "flex-start")
            .css("flex-direction", "column")
            .css("gap", "10%");
          setTimeout(() => {
            $(".message-success").removeClass("hidden");
          }, 100);
        }, 300);
        dataLayer.push({ event: "Form Submission" });
        return;
      } else {
        messageFail();
      }
    })
    .catch((err) => console.log(err));

  const messageFail = () => {
    formHasSubmitted = false;
    $(".error-box").append(
      '<div class="message-error">An error occured while submitting your message. Please try again or call us at <a href="tel:8014466464">(801) 446-6464</a>'
    );
  };

  return;
};

const getScrollBarWidth = () => {
  var inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return w1 - w2;
};

$(".profile-image").on("click", (e) => {});

const closeModal = () => {
  const modal = $(".profile-modal");
  modal.addClass("hidden");
  setTimeout(() => {
    modal.css("display", "none");
    $("body").css("overflow-y", "unset");
    $("html").css("width", "unset");
    $("body").css("width", "unset");
  }, 300);
};

$(".modal-bg").on("click", () => {
  closeModal();
});
