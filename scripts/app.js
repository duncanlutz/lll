const queryParams = window.location.search.slice(1).split("&");
let captcha = false;
let captchaVisible = false;

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
    if (captchaVisible) {
      if (captcha === false) {
        addToMessage("* Please complete the reCAPTCHA.");
      }
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
    $(".error-box").html(errorMessage);
    return;
  }

  if (captchaVisible) {
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
          return;
        } else {
          messageFail();
        }
      })
      .catch((err) => console.log(err));

    const messageFail = () => {
      $(".error-box").append(
        '<div class="message-error">An error occured while submitting your message. Please try again or call us at <a href="tel:8014466464">(801) 446-6464</a>'
      );
    };
    return;
  }

  grecaptcha.render("recaptcha", {
    sitekey: "6LcaCjMgAAAAAJKnOcBSBmNjfN8uJ_CBinmElBoI",
    callback: captchaCallback,
  });
  captchaVisible = true;
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
