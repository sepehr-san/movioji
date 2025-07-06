// --- 1. Define your riddles here ---
const riddles = [
  { date: '2025-07-02', emojis: ['🍊','👁️'], answer: 'Clockwork Orange'},
  { date: '2025-07-03', emojis: ['🦁','👑'], answer: 'Lion King'},
  { date: '2025-07-04', emojis: ['🛢','🩸','🏗'], answer: 'There Will Be Blood'},
  { date: '2025-07-05', emojis: ['🏜','🚶','🛣'], answer: 'Paris Texas'},
  { date: '2025-07-06', emojis: ['🌆','☄️','🛸'], answer: 'Asteroid City'},
  { date: '2025-07-07', emojis: ['💃','🕺','🍔'], answer: 'Pulp Fiction'},
  { date: '2025-07-08', emojis: ['💏','🚅','🌅'], answer: 'Before Sunrise'},
  { date: '2025-07-09', emojis: ['👴','💔','👵','🛌'], answer: 'Amour'},
  { date: '2025-07-10', emojis: ['🧼','👊'], answer: 'Fight Club'},
  { date: '2025-07-11', emojis: ['🦈','🏖️'], answer: 'Jaws'},
  { date: '2025-07-12', emojis: ['🕺','🥃','🚸'], answer: 'Another Round'},
  { date: '2025-07-13', emojis: ['👴','👵','💊'], answer: 'My Favourite Cake'},
  // add more riddles here...
];

// --- 2. Helper to format date to YYYY-MM-DD ---
function formatDate(d) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

// --- 3. Normalize strings: remove spaces & lowercase ---
function normalize(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}

// --- 4. Feedback helper with CSS‑driven fade in/out ---
function showFeedback(msg) {
  feedback.textContent = msg;
  requestAnimationFrame(() => {
    feedback.style.opacity = '1';
  });
  setTimeout(() => {
    feedback.style.opacity = '0';
    setTimeout(() => {
      feedback.textContent = '';
    }, 500);
  }, 3000);
}

// --- 5. State: current index in riddles array ---
let currentIndex = riddles.findIndex(r => r.date === formatDate(new Date()));
if (currentIndex < 0) currentIndex = riddles.length - 1; // fallback to last

// Alias for easier access
function getCurrentRiddle() {
  return riddles[currentIndex];
}

// --- 6. Update UI to show current riddle emojis ---
const emojiDisplay = document.getElementById('emoji-display');
const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');

function loadRiddle() {
  const r = getCurrentRiddle();
  emojiDisplay.textContent = r.emojis.join(' ');
  feedback.textContent = '';
  feedback.style.opacity = '0';
  input.value = '';
  input.focus();
}
loadRiddle();

// --- 7. Handle guesses ---
form.addEventListener('submit', e => {
  e.preventDefault();
  const guess = input.value.trim();
  if (!guess) return;

  // Persian‑character check
  if (/[\u0600-\u06FF]/.test(guess)) {
    showFeedback('لطفا انگلیسی پرتاب کن');
    input.value = '';
    return;
  }

  const r = getCurrentRiddle();
  if (normalize(guess) === normalize(r.answer)) {
    // show win modal with "Previous" button if possible
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    // build optional Previous button only if there is one
    const prevButton = currentIndex > 0
      ? `<button id="prev-riddle">معمای دیروز</button>`
      : '';

    overlay.innerHTML = `
      <div class="modal">
        <h2>برنده شدی!</h2>
        <p><strong>${r.answer}</strong></p>
        <div class="modal-buttons">
          ${prevButton}
          <button id="close-modal">می‌رم فردا میام</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close handler
    overlay.querySelector('#close-modal').onclick = () => overlay.remove();

    // Previous handler
    overlay.querySelector('#prev-riddle').onclick = () => {
      overlay.remove();
      if (currentIndex > 0) {
        currentIndex--;
        loadRiddle();
      }
    };
  } else {
    showFeedback('یه بار دیگه پرتاب کن');
  }
});