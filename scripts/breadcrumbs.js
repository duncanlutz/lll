(() => {

  const loc = window.location.pathname;

  if (loc === "/") {
    $(".breadcrumbs").empty();
    return;
  }

  const split = loc.substring(1).split("/");

  split.forEach((s) => {
    if (split.length === 1) {
      switch (s) {
        case "attorneys":
          $(".breadcrumbs").append(`
            <span class="cur-page-name">
            Attorneys
            </span>`);
          break;
      }
      return;
    }

    if (split.indexOf(s) === 0) {
      switch (s) {
        case "attorneys":
          $(".breadcrumbs").append(`
                <a class="breadcrumb-link" href="/attorneys">
                    <div class="breadcrumb-link-text">Attorneys</div>
                    <div class="breadcrumb-link-underline"></div>
                </a>`);
          break;
      }
      return;
    }

    switch (split[0]) {
      case "attorneys":
        const name = s.split("-");
        let finalName = "";
        name.forEach((word) => {
          let tempWord = "";

          for (let i = 0; i < word.length; i++) {
            if (i === 0) {
              tempWord += word[i].toUpperCase();
              continue;
            }

            tempWord += word[i];
          }

          finalName += `${tempWord} `;
        });

        $(".breadcrumbs").append(`
        <span class="breadcrumb-slash">/
            <span class="cur-page-name">
                ${finalName.trim()}
            </span>
        </span>
        `);
        console.log(finalName);
        break;
    }
  });
})();
