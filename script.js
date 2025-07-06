// --- 1. Define your riddles here ---
const riddles = [
  { date: '2025-07-06', emojis: ['🍊','👁️'], answer: 'Clockwork Orange' },
  { date: '2025-07-07', emojis: ['🦁','👑'], answer: 'Lion Ling' },
  { date: '2025-07-08', emojis: ['🦁','👑'], answer: 'Lion Ling' },
  { date: '2025-07-09', emojis: ['🦁','👑'], answer: 'Lion Ling' },
  { date: '2025-07-10', emojis: ['🦁','👑'], answer: 'Lion Ling' },
  { date: '2025-07-11', emojis: ['🦁','👑'], answer: 'Lion Ling' },
  // add more riddles here...
];

// --- 2. Helper to format date ---
function formatDate(d) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

// --- 3. Normalize strings: remove spaces & toLowerCase ---
function normalize(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}

// --- 4. Feedback helper with CSS‑driven fade in/out ---
function showFeedback(msg) {
  feedback.textContent = msg;
  // fade‑in
  requestAnimationFrame(() => {
    feedback.style.opacity = '1';
  });
  // after 3s, fade‑out then clear text
  setTimeout(() => {
    feedback.style.opacity = '0';
    setTimeout(() => {
      feedback.textContent = '';
    }, 500); // matches the CSS transition duration
  }, 3000);
}

// --- 5. On load, pick today’s riddle ---
const today = formatDate(new Date());
const todayRiddle = riddles.find(r => r.date === today);

const emojiDisplay = document.getElementById('emoji-display');
const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');

if (!todayRiddle) {
  emojiDisplay.textContent = '❓';
  feedback.textContent = "امروز خبری نیست. برو فردا بیا.";
  form.style.display = 'none';
} else {
  emojiDisplay.textContent = todayRiddle.emojis.join(' ');
}

// --- 6. Handle guesses ---
form.addEventListener('submit', e => {
  e.preventDefault();
  const guess = input.value.trim();
  if (!guess) return;

  // If Persian characters detected
  if (/[\u0600-\u06FF]/.test(guess)) {
    showFeedback('لطفا انگلیسی پرتاب کن');
    input.value = '';
    input.focus();
    return;
  }

  // Correct guess → show modal
  if (normalize(guess) === normalize(todayRiddle.answer)) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>برنده شدی!</h2>
        <p><strong>${todayRiddle.answer}</strong></p>
        <button id="close-modal">می‌رم فردا میام</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('close-modal').onclick = () => overlay.remove();
  }
  // Wrong guess → fade feedback
  else {
    showFeedback('یکی دیگه پرتاب کن');
    input.value = '';
    input.focus();
  }
});
