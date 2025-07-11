// --- 1. Define your riddles here ---
const riddles = [
  { date: '2025-07-02', emojis: ['🍊','👁️'], answer: 'Clockwork Orange', keywords: ['clock'], hints: ['۱۹۷۱','کوبریک']},
  { date: '2025-07-03', emojis: ['🦁','👑'], answer: 'Lion King', hints: ['انیمیشنه','سیمبا']},
  { date: '2025-07-04', emojis: ['🛢','🩸','🏗'], answer: 'There Will Be Blood', keywords: ['will','blood'], hints: ['دنیل دی لوئیس','مربوط به نفته']},
  { date: '2025-07-05', emojis: ['🏜','🚶','🛣'], answer: 'Paris Texas', hints: ['جاده‌ایه','ویم وندرس']},
  { date: '2025-07-06', emojis: ['🌆','☄️','🛸'], answer: 'Asteroid City', keywords: ['astroid','asteroid'], hints: ['قرینه است', 'خیلی رنگ داره', 'وز اندرسون']},
  { date: '2025-07-07', emojis: ['💃','🕺','🍔'], answer: 'Pulp Fiction', keywords: ['pulp','fiction'], hints: ['جان تراولتا','تارانتینو']},
  { date: '2025-07-08', emojis: ['💏','🚅','🌅'], answer: 'Before Sunrise', keywords: ['before','sunrise'], hints: ['ریچارد لینک‌لیتر','قسمت اول یک سگانه است']},
  { date: '2025-07-09', emojis: ['👴','💔','👵','🛌'], answer: 'Amour', hints: ['فرانسویه','کُنده','پرنده داره توش']},
  { date: '2025-07-10', emojis: ['🧼','👊'], answer: 'Fight Club',keywords: ['fight', 'club'], hints: ['از روی یک کتابه','آخرش انفجار می‌شه','فینچر ساختش']},
  { date: '2025-07-11', emojis: ['🦈','🏖️'], answer: 'Jaws', hints: ['درباره یه حیوونه (غیب گفتم)','۱۹۷۵','اسپیلبرگ']},
  { date: '2025-07-12', emojis: ['🕺','🥃','🚸'], answer: 'Another Round', keywords: ['another','round'], hints: ['رقص داره','عرق زیاد داره','مدز میکلسن توشه']},
  { date: '2025-07-13', emojis: ['👴','👵','💊'], answer: 'My Favourite Cake', keywords: ['cake','Favourite'], hints: ['ایرانیه','رقص داره','آخرش یکی می‌میره']},
  { date: '2025-07-14', emojis: ['🚌','✍️','📝'], answer: 'Paterson', hints: ['بازیگر ایرانی داره','شخصیت شاعره','آبشار داره','جیم جارموش']},
  { date: '2025-07-15', emojis: ['🧢','👨🏻','🍝','👬🏻'], answer: 'The Fosh', keywords: ['fosh','pedar','sag','alo'], hints: ['شخصیت ایرانی داره','زبان تند و تیز','انتهاش ناهار داره','هوندا آکورد']},
  { date: '2025-07-16', emojis: ['👩🏻','📱','🤖','💌'], answer: 'Her', hints: ['رنگ قرمز داره','اسکارلت جانسون','داره سَرمون میاد','خوآکین فینیکس داره']},
  { date: '2025-07-17', emojis: ['💔','💐','🇪🇹','🗺','🛣'], answer: 'Broken Flowers', keywords: ['broken','flower'],hints: ['جاز اتیوپیایی','شخصیت دنبال یه زنه','بیل موری','جیم جارموش']},
  { date: '2025-07-18', emojis: ['🇭🇺','🏩','⛷️','🖼','🎁'], answer: 'Grand Budapest Hotel', keywords:['grand','budapest'], hints: ['پادو توشه','اکثرا برفیه','قطار داره','وز اندرسون']},
  { date: '2025-07-19', emojis: ['⛪','🏆','🐍'], answer: 'Monty Python and the Holy Grail', keywords:['monty','grail','holy'], hints: ['شدیدا کمدیه','انگلیسیه','۱۹۷۵','کار یک گروه کمدی معروفه']},
  { date: '2025-07-20', emojis: ['👁','🎭','💋','😣'], answer: 'Eyes Wide Shut', keywords:['wide','shut'], hints: ['ماسک و موسیقی ترسناک','نیکول کیدمن','تام کروز','کوبریک']},
  { date: '2025-07-21', emojis: ['🏠','🔥','🏚','💔','👨‍👦','🛟'], answer: 'Manchester by the Sea', keywords:['manchester','by'], hints: ['آداجیوی آلبینونی توشه','یک برادر بزرگ می‌میرد (اسپول نیست)']},
  
];

// --- 2. Helpers: format date & Persian digits ---
function formatDate(d) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function toPersianNum(num) {
  return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

// --- 3. Normalize strings ---
function normalize(str) {
  return str.replace(/\s+/g, "").toLowerCase();
}

// --- 4. Feedback helper ---
function showFeedback(msg) {
  feedback.textContent = msg;
  requestAnimationFrame(() => (feedback.style.opacity = "1"));
  setTimeout(() => {
    feedback.style.opacity = "0";
    setTimeout(() => (feedback.textContent = ""), 500);
  }, 3000);
}

// --- 5. State ---
let currentIndex = riddles.findIndex((r) => r.date === formatDate(new Date()));
if (currentIndex < 0) currentIndex = riddles.length - 1;
let hintCount = 0;
let score = 100;

// --- 6. UI references ---
const emojiDisplay = document.getElementById("emoji-display");
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const hintBtn = document.getElementById("hint-button");
const hintsArea = document.getElementById("hints-display");
const scoreBar = document.getElementById("score-bar");
const scoreValue = document.getElementById("score-value");

// Update score display
function updateScore() {
  if (score <= 0) {
    score = 0;
  }
  if (scoreValue) scoreValue.textContent = toPersianNum(score);
  if (scoreBar) scoreBar.style.width = `${score}%`;
}

// --- 7. Load riddle ---
function loadRiddle() {
  const r = riddles[currentIndex];
  emojiDisplay.textContent = r.emojis.join(" ");
  feedback.textContent = "";
  feedback.style.opacity = "0";
  input.value = "";
  input.focus();

  hintCount = 0;
  score = 100;
  hintsArea.innerHTML = "";
  hintBtn.textContent = "کمک می‌خوام";
  hintBtn.style.backgroundColor = "#D2C1B6";
  updateScore();
}
loadRiddle();

// --- 8. Hint handler ---
hintBtn.addEventListener("click", () => {
  const r = riddles[currentIndex];
  const hints = Array.isArray(r.hints) ? r.hints : [];
  if (hintCount < hints.length) {
    const hintText = document.createElement("p");
    hintText.textContent = hints[hintCount];
    hintsArea.appendChild(hintText);
    hintCount++;
    score = Math.max(0, score - 20);
    updateScore();
    input.focus();
    if (hintCount === hints.length) {
      hintBtn.textContent = "جوابو ببینم";
      hintBtn.style.backgroundColor = "rgb(197, 103, 103)";
    }
  } else {
    score = 0;
    updateScore();
    showModal(false, 0);
  }
});

// --- 9. Show modal ---
function showModal(won, finalScore) {
  const r = riddles[currentIndex];
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  const prevBtn =
    currentIndex > 0 ? `<button id="prev-riddle">معمای دیروز</button>` : "";
  overlay.innerHTML = `
    <div class="modal">
      <h2>${won ? "هورااا" : " جواب اینه"}</h2>
      <p id="last-answer"><strong>${r.answer}</strong></p>
      <div id="emoji-display" class="emoji-display">${
        emojiDisplay.textContent
      }</div>
      <p>امتیازت: ${toPersianNum(finalScore)}</p>
      <div class="modal-buttons">
        ${prevBtn}
        <button id="close-modal">می‌رم فردا میام</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector("#close-modal").onclick = () => {
    overlay.remove();
    loadRiddle();
  };
  if (prevBtn)
    overlay.querySelector("#prev-riddle").onclick = () => {
      overlay.remove();
      currentIndex--;
      loadRiddle();
    };
}

// --- 10. Handle guesses ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const guess = input.value.trim();
  if (!guess) return;
  if (/[؀-ۿ]/.test(guess)) {
    showFeedback("لطفا انگلیسی پرتاب کن");
    input.value = "";
    return;
  }
  
  // 1️⃣ normalize by removing spaces & lowercasing
  const normalizedGuess = guess.toLowerCase().replace(/\s+/g, "");

  // 2️⃣ get your keywords (fallback to answer)
  const r = riddles[currentIndex];
  const keywords = Array.isArray(r.keywords)
    ? r.keywords
    : [r.answer];

  // 3️⃣ check if ANY keyword (normalized) is a substring
  const isCorrect = keywords.some(kw =>
    normalizedGuess.includes(
      kw.toLowerCase().replace(/\s+/g, "")
    )
  );

  if (isCorrect) {
    showModal(true, score);
  } else {
    score = Math.max(0, score - 10);
    updateScore();
    showFeedback("دوباره پرتاب کن");
    input.value = "";
  }
});
