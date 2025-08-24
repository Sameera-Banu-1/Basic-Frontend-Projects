const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I thought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
  'AbcDe FGhiJ kLMn Opq RsT UvW xYz  are THE ALPha BEts In EngLIsH.'
];

let words = [];
let wordIndex = 0;
let startTime = null;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  // Pick a random quote
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  words = quote.split(' ');
  wordIndex = 0;

  // Display quote with span wrappers
  quoteElement.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';

  // Reset UI
  messageElement.innerText = '';
  typedValueElement.value = '';
  typedValueElement.className = '';
  typedValueElement.focus();

  // Start timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  // Check if user pressed space after typing
  if (typedValue.endsWith(' ')) {
    const trimmed = typedValue.trim();

    if (trimmed === currentWord) {
      // Correct word typed
      wordIndex++;
      typedValueElement.value = '';
      typedValueElement.className = '';

      // Clear all highlights
      quoteElement.childNodes.forEach(span => span.className = '');

      // Highlight next word
      if (wordIndex < words.length) {
        quoteElement.childNodes[wordIndex].className = 'highlight';
      } 
      else {
        // Typing complete
        const elapsedTime = (new Date().getTime() - startTime) / 1000;
        messageElement.innerText = `🎉 Finished in ${elapsedTime.toFixed(2)} seconds!`;
        typedValueElement.disabled = true;
      }
    } else {
      // Incorrect word typed
      typedValueElement.className = 'error';
    }
  } else {
    // While typing — check if it's a valid prefix
    if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  }
});
// 🌙 Dark mode toggle
const toggleThemeBtn = document.getElementById('toggle-theme');

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
