// Get the bottom most location: document.body.getBoundingClientRect();
// Scroll tp the top: $(document).scrollTop(0, 0)
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var text = ['top', 'bottom'];
var grammer = '#JSGF V1.0; grammar text; public <text> = ' + text.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var SpeechRecognitionGrammerList = new SpeechGrammarList();
SpeechRecognitionGrammerList.addFromString(grammer, 1)

recognition.grammers = SpeechRecognitionGrammerList;
recognition.lang = 'en-US';
recognition.interimResults = false;
var diagnostic = $('.output');

recognition.onresult = function(event) {
  var word = event.results.length - 1;
  var command = event.results[word][0].transcript;
  diagnostic.textContent = command;
  console.log(diagnostic.textContent);
  console.log("I am here");


  if(command.toLowerCase() == 'top'){
    $(document).scrollTop(0, 0);
  }
  else if (command.toLowerCase() == 'bottom'){
    $(document).scrollTop(document.body.getBoundingClientRect(), 0);
  }

  else if (command.toLowerCase() == 'up'){
    $(document).scrollTop(document.body.getBoundingClientRect().top + 10, 0);
  }

  else if (command.toLowerCase() == 'down'){
    $(document).scrollTop(document.body.getBoundingClientRect() - 10, 0);
  }
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that command.";
};

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
};

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a command.');
};
