
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
    
    if (transcript.includes('finish summary')) {
      addToHPI = false;
    } else {
      hpiElement.textContent = transcript;
    }
    
    if (transcript.includes('on exam') || transcript.includes('an exam')) {
      addToOnExam = true;
    }
    
    if (transcript.includes('finish exam')) {
      addToOnExam = false;
    } else {
      onExamElement.textContent = transcript;
    }

    if (event.results[0].isFinal) {
      wholeConversation.textContent += `${transcript} `;
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
});
