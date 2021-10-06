const galleryItems = document.querySelector(".gallery-item").children;
const galleryPhotos = document.querySelector(".item").children;
//console.log(galleryPhotos);
const page = document.querySelector(".page-num");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const maxItem = 8;
var totalPhotos;
var index = 1;

const pagination = Math.ceil(galleryItems.length / maxItem);
console.log(galleryItems);
//let totalPhotos = data.photos.photo;
//let index = 1;
//console.log(galleryItems.length);
// function showItems1() {
//   //   for (let i = 0; i < totalPhotos; i++) {
//   //     galleryPhotos[i].classList.add("hide");
//   //   }
//   //   if (i >= index * maxItem - maxItem) {
//   var i = 0;
//   if (i >= index * maxItem - maxItem && i < index * maxItem) {
//     $(".showPhoto").addClass("show");
//   }
//   //   }
// }

function showItems() {
  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].classList.remove("show");
    galleryItems[i].classList.add("show");
    if (i >= index * maxItem - maxItem && i < index * maxItem) {
      galleryItems[i].classList.remove("hide");
      galleryItems[i].classList.add("show");
    }
    page.innerHTML = index;
  }
}

prev.addEventListener("click", function () {
  index--;
  check();
  showItems();
});

next.addEventListener("click", function () {
  index++;
  check();
  showItems();
});

function check() {
  if (index == pagination) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
  if (index == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
}

window.onload = function () {
  showItems();
  check();
};
var flickrPhotos = {
  async: true,
  crossDomain: true,
  url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=fdc2f6684632862a472cbbb4863fffdd&gallery_id=72157649154168622&format=json&nojsoncallback=1",
  method: "GET",
  headers: {},
};

$.ajax(flickrPhotos).done(function (data) {
  var totalPhotos = data.photos.total;
  console.log(totalPhotos);
  //console.log(data);
  //$("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
  $.each(data.photos.photo, function (i, gp) {
    var serverId = gp.server;
    var id = gp.id;
    var secret = gp.secret;
    // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg

    $(".item").append(
      '<img class="showPhoto" style="height:200px;width:250px;border:5px solid white;" src="https://live.staticflickr.com/' +
        serverId +
        "/" +
        id +
        "_" +
        secret +
        '.jpg"/>'
    );
  });
  $("img").css("cursor", "pointer");
  $(".showPhoto").addClass("hide");
});
