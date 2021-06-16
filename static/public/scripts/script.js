//sources:
//sound effects: https://www.myinstants.com/index/nl/

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
const likeButton = document.getElementById("bone");
const dogImg = document.getElementById("dogImg");

likeButton.addEventListener("click", () => {
  sound("nom");
});

likeButton.addEventListener("mouseover", () => {
  sound("sparkle");
});

dogImg.addEventListener("click", () => {
  sound("bark");
});

//audio component
function sound(file) {
  let source = "./files/" + file + ".mp3";
  let audio = new Audio(source);
  audio.volume = 0.05;
  audio.play();
}

const infoDog = document.getElementById("infodog");

//jumping dog
setInterval(hop, 4000);

function hop() {
  infoDog.style.marginBottom = "3em";
  setTimeout(down, 100);
}

function down() {
  infoDog.style.marginBottom = "0";
}

document.getElementById("del").addEventListener("click", () => {
  alert("Wow. Did you really just delete a dog???!?!?1/1!/");
});
