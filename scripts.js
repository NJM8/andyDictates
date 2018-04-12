
document.addEventListener('DOMContentLoaded', function(){
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  const wholeConversation = document.querySelector('#wholeConversation');
  const hpiElement = document.querySelector('#hpi');
  const onExamElement = document.querySelector('#onExam');

  let addToHPI = false;
  let addToOnExam = false;
  
  recognition.addEventListener('result', event => {
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
    if (transcript.includes('heard you say')) {
      addToHPI = true;
    }
    
    if (transcript.includes('on exam') || transcript.includes('an exam')) {
      addToOnExam = true;
    }
    
    if (addToHPI) {
      hpiElement.textContent = transcript;
    }

    if (addToOnExam) {
      onExamElement.textContent = transcript;
    }

    if (event.results[0].isFinal) {
      wholeConversation.textContent += `${transcript} `;
      addToHPI = false;
      addToOnExam = false;
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();

  const btns = document.querySelectorAll('button');
  const clipboard = new ClipboardJS(btns);
  clipboard.on('success', function(e) {
      console.log(e);
  });
  clipboard.on('error', function(e) {
      console.log(e);
  });
});
