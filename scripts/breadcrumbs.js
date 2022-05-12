(() => {

  const loc = window.location.pathname;

  if (loc === "/") {
    $(".attorney-breadcrumbs").empty();
    return;
  }

  const split = loc.substring(1).split("/");

  split.forEach((s) => {
    if (split.length === 1) {
      switch (s) {
        case "attorneys":
          $(".attorney-breadcrumbs").append(`
            <span class="attorney-link-name">
            Attorneys
            </span>`);
          break;
      }
      return;
    }

    if (split.indexOf(s) === 0) {
      switch (s) {
        case "attorneys":
          $(".attorney-breadcrumbs").append(`
                <a class="attorney-link" href="/attorneys">
                    <div class="link-text">Attorneys</div>
                    <div class="link-underline"></div>
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

        $(".attorney-breadcrumbs").append(`
        <span class="attorney-slash">/
            <span class="attorney-link-name">
                ${finalName.trim()}
            </span>
        </span>
        `);
        console.log(finalName);
        break;
    }
  });
})();
