attorneyHtmlString = `<div class="profile-section swiper-wrapper">\n`;

(async () => {
  const path = window.location.pathname;

  if (path !== "/") {
    return;
  }

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const attorneys = await fetch("/attorneys?format=json", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.items;
    })
    .catch((error) => console.log("error", error));

    console.log(attorneys);

    attorneys.forEach(attorney => {
        attorneyHtmlString += `<div class="team-profile-item swiper-slide">\n<a href="${attorney.fullUrl}" class="image-wrapper test">\n<img src="${attorney.assetUrl}" class="profile-image" alt="Image of attorney ${attorney.title}" />\n</a>\n</div>`;
    })
    attorneyHtmlString += `  </div>\n<div class="p-nav-button-next back-button swiper-button-next"></div>\n<div class="p-nav-button-prev forward-button swiper-button-prev"></div>\n<div class="p-pagination pagination"></div>`
    $('.profile-wrapper').html(attorneyHtmlString)
})();

let stop = false;
let frameCount = 0;
let prevMenuNumber, fps, fpsInterval, startTime, now, then, elapsed;

const sliders = document.querySelectorAll(".swiper");

const setMenu = (newNumber, space) => {
    $(".profile-wrapper").html(`
      <div class="profile-section swiper-wrapper">
      <div class="team-profile-item swiper-slide">
          <a href="attorneys?john-lowrance" class="image-wrapper test">
              <img src="../assets/John_Headshot.png" class="profile-image john_l" alt="Image of John Lowrance">
          </a>
      </div>
      <div class="team-profile-item swiper-slide">
          <a href="attorneys?rick-lundell" class="image-wrapper">
              <img src="../assets/Rick_Headshot.png" class="profile-image rick_l" alt="Image of Rick Lundell">
          </a>
      </div>
      <div class="team-profile-item swiper-slide">
          <a href="attorneys?brian-lofgren" class="image-wrapper">
              <img src="../assets/Brian_Headshot.png" class="profile-image brian_l"
                  alt="Image of Brian Lofgren">
          </a>
      </div>
      <div class="team-profile-item pi-inactive swiper-slide">
          <a href="attorneys?duncan-lutz" class="image-wrapper">
              <img src="../assets/Duncan_Headshot.png" class="profile-image" alt="Image of Duncan Lutz">
          </a>
      </div>
  </div>
  <div class="p-nav-button-next back-button swiper-button-next"></div>
  <div class="p-nav-button-prev forward-button swiper-button-prev"></div>
  <div class="p-pagination pagination"></div>`);
  
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].classList.add(`swiper-container-${i}`);
      options = {
        speed: 600,
        slidesPerView: newNumber,
        spaceBetweens: space,
        slidesPerGroup: newNumber,
        loop: true,
        loopFillGroupWithBlank: true,
        simulateTouch: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      };
  
      if (sliders[i].classList.contains("testim-swiper")) {
        options.loop = false;
        options.slidesPerView = 1;
        options.slidesPerGroup = 1;
        options.navigation = {
          nextEl: ".t-nav-button-next",
          prevEl: ".t-nav-button-prev",
        };
      }
      const swiper = new Swiper(`.swiper-container-${i}`, options);
    }
    stop = true;
  };
  
  const checkWidth = () => {
    if (stop) {
      return;
    }
    elapsed = now - then;
    let menuNumber, spaceBetween;
    const width = $(window).innerWidth();
    switch (true) {
      case width < 700:
        menuNumber = 2;
        spaceBetween = 99;
        break;
      case width > 700 && width < 1200:
        menuNumber = 3;
        spaceBetween = 66;
        break;
      case width > 1200:
        menuNumber = 4;
        spaceBetween = 33;
        break;
    }
    if (prevMenuNumber === menuNumber) {
      stop = true;
      return;
    } else {
      prevMenuNumber = menuNumber;
      requestAnimationFrame(checkWidth);
      now = Date.now();
      setMenu(menuNumber, spaceBetween);
    }
  };
  
  function startAnimating(fps) {
    stop = false;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    checkWidth();
  }
  
  $(document).on("ready", startAnimating(5));
  $(window).on("resize", () => {
    requestAnimationFrame(() => startAnimating(5));
  });