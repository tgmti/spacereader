var synth = window.speechSynthesis;

var voices = [];

var nxt = document.querySelector('#next');
var gameForm = document.querySelector('#game');

var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var btn3 = document.querySelector('#btn3');

var result = document.querySelector('#success');

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
  "Spinossauro",
  "Braquiossauro",
  "Anquilossauro",
  "Alossauro",
  "Carnossauro",
  "Pteranodonte",
  "Parasaurolophus",
  "Oviraptor",
  "Indominus Rex",
  "Stygimoloch"
 
];

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

function speak(words){
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (words !== '') {
    var utterThis = new SpeechSynthesisUtterance(words);
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

var word = "";

gameForm.onsubmit = function(event) {
  event.preventDefault();
  start();
}

function start(){
  var randomItem = words[Math.floor(Math.random()*words.length)];

  result.innerHTML = "";
  btn1.classList.remove("btn-success");
  btn1.classList.remove("btn-danger");
  btn2.classList.remove("btn-success");
  btn2.classList.remove("btn-danger");
  btn3.classList.remove("btn-success");
  btn3.classList.remove("btn-danger");

  btn1.innerHTML = words[Math.floor(Math.random()*words.length)];
  btn2.innerHTML = words[Math.floor(Math.random()*words.length)];
  btn3.innerHTML = words[Math.floor(Math.random()*words.length)];

  var btns = [btn1, btn2, btn3];
  var btn = btns[Math.floor(Math.random()*btns.length)];

  speak(btn.innerHTML);
  word = btn.innerHTML;
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
  if (btn.innerHTML == word){
    result.innerHTML = "Success!";
    btn.classList.add("btn-success");
  } else {
    btn.classList.add("btn-danger");
    result.innerHTML = "Try again!";
  }
}
