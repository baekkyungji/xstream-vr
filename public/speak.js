var synth = window.speechSynthesis;
var body = document.querySelector('body');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
  });
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speakStart(words){
  var utterThis = new SpeechSynthesisUtterance(words);
  utterThis.onend = function (event) {
    // console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
    // console.error('SpeechSynthesisUtterance.onerror');
  }
  var selectedOption = "Google US English";
  // console.log(selectedOption);
  for(i = 0; i < voices.length ; i++) {
    console.log(voices[i]);
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break;
    }
  }
  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

body.onload = function (event) {
  console.log("Speak");
  speakStart("Amazing");
};
