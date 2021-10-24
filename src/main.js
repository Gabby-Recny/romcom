var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var tagLine1 = document.querySelector('.tagline-1');
var tagLine2 = document.querySelector('.tagline-2');
var randomButton =  document.querySelector('.random-cover-button');
var makeNewButton = document.querySelector('.make-new-button');
var homePage = document.querySelector('.home-view');
var coverForm = document.querySelector('.form-view');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var savedCoversSection = document.querySelector('.saved-covers-section');
var savedView = document.querySelector('.saved-view');
var userCover = document.querySelector('#cover');
var userTitle = document.querySelector('#title');
var descriptor1 = document.querySelector('#descriptor1');
var descriptor2 = document.querySelector('#descriptor2');
var customBookButton = document.querySelector('.create-new-book-button');

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

window.addEventListener('load', generateBook);
randomButton.addEventListener('click', generateBook);
makeNewButton.addEventListener('click', showForm);
viewSavedButton.addEventListener('click', showSavedCovers);
homeButton.addEventListener('click',returnToMain);
customBookButton.addEventListener('click', createCustomCover);
saveCoverButton.addEventListener('click', saveCover);
savedCoversSection.addEventListener('dblclick', deleteCover);

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function generateBook() {
   currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
   coverImage.src = currentCover.cover;
   coverTitle.innerText = currentCover.title;
   tagLine1.innerText = currentCover.tagline1;
   tagLine2.innerText = currentCover.tagline2;
}

function showForm() {
  homePage.classList.add('hidden');
  coverForm.classList.remove('hidden');
  randomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
}

function showSavedCovers() {
  homePage.classList.add('hidden');
  savedView.classList.remove('hidden');
  saveCoverButton.classList.add('hidden');
  randomButton.classList.add('hidden');
  homeButton.classList.remove('hidden');

  displaySavedCovers();
}

function returnToMain() {
  homePage.classList.remove('hidden');
  randomButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  savedView.classList.add('hidden');
  homeButton.classList.add('hidden');
  coverForm.classList.add('hidden');
}

function createCustomCover(event) {
  event.preventDefault();

  currentCover = new Cover(userCover.value, userTitle.value, descriptor1.value, descriptor2.value);

  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(descriptor1.value, descriptor2.value);

  coverImage.src = userCover.value;
  coverTitle.innerText = userTitle.value;
  tagLine1.innerText = descriptor1.value;
  tagLine2.innerText = descriptor2.value;

  returnToMain();
}

function saveCover() {
  if(!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

function displaySavedCovers() {
  savedCoversSection.innerHTML = '';
  for(var i = 0; i < savedCovers.length; i++) {
    savedCoversSection.innerHTML +=
     `<section class="mini-cover" id =${savedCovers[i].id}>
        <img class="cover-image" src="${savedCovers[i].cover}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      </section>`
  }
}

function deleteCover() {
  var coverTarget = Number(event.target.closest("section").id);
  for(var i = 0; i < savedCovers.length; i++) {
    if(savedCovers[i].id === coverTarget) {
      savedCovers.splice(i, 1);
    }
  }
  displaySavedCovers();
}
