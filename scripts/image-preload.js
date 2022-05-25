(async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let picArr = [];

  const attorneys = await fetch("/attorneys?format=json", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.items;
    })
    .catch((error) => console.log("error", error));

  attorneys.forEach((attorney) => {
    if (attorney.customContent.listImage) picArr.push(attorney.customContent.listImage.assetUrl);
    if (attorney.customContent.profileImage) picArr.push(attorney.customContent.profileImage.assetUrl);
  });

  const preloadImages = (array) => {
    if (!preloadImages.list) {
      preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
      var img = new Image();
      img.onload = function () {
        var index = list.indexOf(this);
        if (index !== -1) {
          list.splice(index, 1);
        }
      };
      list.push(img);
      img.src = array[i];
    }
  };

  preloadImages([...picArr, '../assets/bradyn-shock-3yno9AWLIu4-unsplash.webp', '../assets/bradyn-shock-9vvotQTYxFE-unsplash.webp', '../assets/bradyn-shock-NGzIGVj45qA-unsplash.webp', '../assets/criminal_defense_picture.webp', '../assets/immigration_picture.webp', '../assets/personal_injury_picture.webp', '../assets/wrongful_death_picture.webp']);
})();
