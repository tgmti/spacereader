var synth = window.speechSynthesis;

var voices = [];

var nxt = document.querySelector('#next');
var gameForm = document.querySelector('#game');

var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var btn3 = document.querySelector('#btn3');

var result = document.querySelector('#success');
var showScore = document.querySelector('#score');
var score = 0;


var words = [
  "Caio",
  "Thiago",
  "Greice",
  "Tiranossauro Rex",
  "Pterodáctilo",
  "Tricerátops",
  "Velociraptor",
  "Estegossauro",
  "Diplodoco",
  "Albertossauro",
  "Argentinossauro",
  "Espinossauro",
  "Braquiossauro",
  "Anquilossauro",
  "Alossauro",
  "Carnotauro",
  "Pteranodonte",
  "Parasaurolofo",
  "Oviraptor",
  "Indominus Rex",
  "Estygimoloch",
  "Mosassauro",
  "Plesiossauro",
 
];

var selected = ""

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(word){
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (word !== '') {
    var utterThis = new SpeechSynthesisUtterance(word);
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.voice = voices[26];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}

gameForm.onsubmit = function(event) {
  event.preventDefault();
  start();
}

function start(){

  showScore.innerHTML = `Pontos: ${score}`;

  result.innerHTML = "";
  result.classList.remove("btn-success");
  result.classList.remove("btn-danger");
  btn1.classList.remove("btn-success");
  btn1.classList.remove("btn-danger");
  btn2.classList.remove("btn-success");
  btn2.classList.remove("btn-danger");
  btn3.classList.remove("btn-success");
  btn3.classList.remove("btn-danger");

  words.sort(() => Math.random() - 0.5);

  btn1.innerHTML = words[0];
  btn2.innerHTML = words[1];
  btn3.innerHTML = words[2];

  var btns = [btn1, btn2, btn3];
  var btn = btns[Math.floor(Math.random()*btns.length)];

  selected = btn.innerHTML

  speak(selected);
}

btn1.onclick = function(){
  check_button(btn1);
}

btn2.onclick = function(){
  check_button(btn2);
}

btn3.onclick = function(){
  check_button(btn3);
}

function check_button(btn){
  speak(btn.innerHTML);
  result.classList.remove("btn-success");
  result.classList.remove("btn-danger");
  if (btn.innerHTML == selected){
    result.innerHTML = "Acertou!!";
    result.classList.add("btn-success");
    btn.classList.add("btn-success");
    score++;
    setTimeout(() => {
      start();
    }, 2000);
  } else {
    btn.classList.add("btn-danger");
    result.classList.add("btn-danger");
    result.innerHTML = "Tente Novamente!";
  }
}
