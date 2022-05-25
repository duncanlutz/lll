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

    console.log(attorneys);

  attorneys.forEach((attorney) => {
    picArr.push(attorney.customContent.listImage.assetUrl);
    picArr.push(attorney.customContent.profileImage.assetUrl);
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
          // remove image from the array once it's loaded
          // for memory consumption reasons
          list.splice(index, 1);
        }
      };
      list.push(img);
      img.src = array[i];
    }
  };

  preloadImages(picArr);
})();
