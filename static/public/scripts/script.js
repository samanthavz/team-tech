//check connection
console.log('script linked');

//info popup
const button = document.getElementById('infoButton');
const content = document.getElementById('overlay');
const closeIt = document.getElementById('close');

button.addEventListener('click', showTip);
closeIt.addEventListener('click', closeTip);

function showTip() {
  content.style.display = 'block';
}

function closeTip() {
  content.style.display = 'none';
}

//sound eastereggs
const likeButton = document.getElementById('bone');
likeButton.addEventListener('click', sound);

const dogImg = document.getElementById('dogImg');
dogImg.addEventListener('click', sound2);

function sound() {
  var audio = new Audio('./files/nom.mp3');
  audio.volume = 0.05;
  audio.play();
}

function sound2() {
  var audio = new Audio('./files/bark.mp3');
  audio.volume = 0.1;
  audio.play();
}
