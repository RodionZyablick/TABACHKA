"use strict";

let selectedCategory = "💬 Критика и придирки";

const themes = {
  neon: {
    bg: "radial-gradient(circle at 50% 30%, #110d22 0%, #06050d 70%, #010103 100%)",
    primary: "#a855f7",
    secondary: "#f43f5e",
    glow: "rgba(168, 85, 247, 0.35)",
  },
  amber: {
    bg: "radial-gradient(circle at 50% 30%, #1a100f 0%, #0a0606 70%, #000000 100%)",
    primary: "#ff7e5f",
    secondary: "#feb47b",
    glow: "rgba(255, 126, 95, 0.35)",
  },
  emerald: {
    bg: "radial-gradient(circle at 50% 30%, #051410 0%, #020706 70%, #000000 100%)",
    primary: "#059669",
    secondary: "#34d399",
    glow: "rgba(5, 150, 105, 0.35)",
  },
  ocean: {
    bg: "radial-gradient(circle at 50% 30%, #09112a 0%, #040815 70%, #000000 100%)",
    primary: "#2563eb",
    secondary: "#38bdf8",
    glow: "rgba(37, 99, 235, 0.35)",
  },
};

const catMemes = [
  {
    text: "А Админ на перекуре, и похуй что он инвалид. 🚬",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0cmN0ZzZ0Z3p0b3h0b3h0b3h0b3h0b3h0b3h0b3h0bMmZ6JnRjPTE/Yf63XvLwSntXN8SdgS/giphy.gif",
  },
  {
    text: "Улетело! Админу сделает вид, что проникся этим (он не умеет читать).",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhzcXRwNXp0b3h0b3h0b3h0b3h0b3h0b3h0b3h0bMmZ6JnRjPTE/mgqef5g8FwTII/giphy.gif",
  },
  {
    text: "Сами леса Лардерона...я забыл. 🌲",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmsycW93MXA3bm9vcmM1bXp6Z3Z0amg0dWZ0Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3/MePp7IARcZo56bNBp9/giphy.gif",
  },
  {
    text: "Заебись. успешно доставлен в главный штаб админу, скоро ответит 🐈",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhzcXRwNXp0b3h0b3h0b3h0b3h0b3h0b3h0bMmZ6JnRjPTE/unQ3IJU2RG7DO/giphy.gif",
  },
  {
    text: "да ну...админ уже плачет. 🥲",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhzcXRwNXp0b3h0b3h0b3h0b3h0b3h0b3h0bMmZ6JnRjPTE/S5n7Wkhhw5A2I/giphy.gif",
  },
  {
    text: "Пакет успешно спизжен. Аве мне, sancta Maria, ОНО работает! 🎰",
    img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhzcXRwNXp0b3h0b3h0b3h0b3h0b3h0bMmZ6JnRjPTE/mlvseq9yvZhba/giphy.gif",
  },
];

const dynamicPlaceholders = [
  "Напиши что-то, от чего у нас упадет всё...",
  "админ на связи...",
  "Твой инсайт на вес золота (или пива)...",
  "Только сюда самый сочный кринж(или сплетни)...",
  "Оставь свой след в истории этой табачки...",
];

// Деликатный тактильный отклик (микро-клики)
function triggerHaptic(type = "light") {
  if (!navigator.vibrate) return;
  if (type === "light") {
    navigator.vibrate(6);
  } else if (type === "double") {
    navigator.vibrate([8, 40, 8]);
  }
}

function playAudioClick(freq = 420, dur = 0.03) {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, context.currentTime);
    gain.gain.setValueAtTime(0.02, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + dur);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + dur);
  } catch (e) {}
}

// Изменение тайтла при смене вкладки
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "вернись пж... 🔮" : "🔮 Табачка-Фидбек";
});

// Настройка кастомного окружения
function setTheme(themeName) {
  const theme = themes[themeName] || themes.amber;
  document.documentElement.style.setProperty("--bg-gradient", theme.bg);
  document.documentElement.style.setProperty("--accent-1", theme.primary);
  document.documentElement.style.setProperty("--accent-2", theme.secondary);
  document.documentElement.style.setProperty("--accent-glow", theme.glow);
  document.querySelectorAll(".theme-dot").forEach((dot) => {
    dot.classList.toggle(
      "active",
      dot.getAttribute("data-theme") === themeName,
    );
  });
  localStorage.setItem("tabachka_theme_v2", themeName);
}

document.querySelectorAll(".theme-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    triggerHaptic("light");
    playAudioClick(480);
    setTheme(dot.getAttribute("data-theme"));
  });
});
setTheme(localStorage.getItem("tabachka_theme_v2") || "amber");

// 3D-параллакс карточки формы
const formCard = document.getElementById("formCard");
document.addEventListener("mousemove", (e) => {
  const x = e.clientX,
    y = e.clientY;
  const moveX = (window.innerWidth / 2 - x) * 0.008;
  const moveY = (window.innerHeight / 2 - y) * 0.008;
  formCard.style.transform = `rotateX(${moveY}deg) rotateY(${-moveX}deg)`;

  document.querySelector(".sphere-1").style.transform =
    `translate(${x * 0.015}px, ${y * 0.015}px)`;
  document.querySelector(".sphere-2").style.transform =
    `translate(${-x * 0.01}px, ${-y * 0.01}px)`;
});

// Эффект взрыва частиц при отправке
function spawnParticlesExplosion() {
  const host = document.getElementById("particleCanvasContainer");
  const palette = [
    "#ff7e5f",
    "#feb47b",
    "#a855f7",
    "#f43f5e",
    "#34d399",
    "#38bdf8",
  ];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement("div");
    el.classList.add("visual-particle");
    const rad = Math.random() * Math.PI * 2,
      len = 50 + Math.random() * 130;
    el.style.setProperty("--mx", `${Math.cos(rad) * len}px`);
    el.style.setProperty("--my", `${Math.sin(rad) * len}px`);
    el.style.left = `50%`;
    el.style.top = `50%`;
    el.style.width = `${4 + Math.random() * 6}px`;
    el.style.height = el.style.width;
    el.style.background = palette[Math.floor(Math.random() * palette.length)];
    el.style.boxShadow = `0 0 10px ${el.style.background}`;
    host.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

// Генерация случайных ников
const randomNicks = [
  "Анонимный Капибара",
  "Шлёпа Комбат",
  "Скрытный Кот",
  "Админский Шпион",
  "Критик из Интернета",
  "Пожиратель Табака",
  "Вайбовый Зритель",
];
const inputName = document.getElementById("username");
const randomBtn = document.getElementById("randomNickBtn");
const mainTitle = document.getElementById("mainTitle");
const submitBtnText = document.querySelector("#submitBtn .btn-text");
const textarea = document.getElementById("complaintText");
const charCount = document.getElementById("charCount");
const progressBarFill = document.getElementById("progressBarFill");
const spyBot = document.getElementById("spyBot");

// Магнитный эффект для кнопки-кубика
const diceWrapper = document.getElementById("diceWrapper");
diceWrapper.addEventListener("mousemove", (e) => {
  const box = randomBtn.getBoundingClientRect();
  const dx = e.clientX - box.left - box.width / 2;
  const dy = e.clientY - box.top - box.height / 2;
  if (Math.abs(dx) < 35 && Math.abs(dy) < 35) {
    randomBtn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px) scale(1.04)`;
  }
});
diceWrapper.addEventListener("mouseleave", () => {
  randomBtn.style.transform = "translate(0,0) scale(1)";
});

randomBtn.addEventListener("click", () => {
  triggerHaptic("light");
  if (randomBtn.classList.contains("rolling")) return;
  randomBtn.classList.add("rolling");

  let steps = 0;
  const rollInterval = setInterval(() => {
    playAudioClick(380 + steps * 60, 0.015);
    steps++;
    if (steps >= 6) clearInterval(rollInterval);
  }, 70);

  setTimeout(() => {
    randomBtn.classList.remove("rolling");
    inputName.value =
      randomNicks[Math.floor(Math.random() * randomNicks.length)];
    evaluateBossAndCombos();
    playAudioClick(850, 0.06);
  }, 450);
});

// Подсказки
let currentPlhIdx = 0;
setInterval(() => {
  currentPlhIdx = (currentPlhIdx + 1) % dynamicPlaceholders.length;
  textarea.setAttribute("placeholder", dynamicPlaceholders[currentPlhIdx]);
}, 8000);

// --- СИСТЕМА АНАЛИЗА СКОРОСТИ ВВОДА (CPS) ДЛЯ УМНОГО БОТА ---
let lastInputTimestamp = Date.now();
let inputIntervals = [];
let botActiveTimeout;

textarea.addEventListener("input", () => {
  const currentTextLen = textarea.value.length;
  charCount.textContent = currentTextLen;

  // Обновление прогресс-бара строки
  const percentage = (currentTextLen / 1000) * 100;
  progressBarFill.style.width = `${percentage}%`;

  if (currentTextLen < 200) charCount.style.color = "#4b5563";
  else if (currentTextLen < 600) charCount.style.color = "#eab308";
  else charCount.style.color = "#f43f5e";

  // Расчёт CPS (Символов в секунду)
  const now = Date.now();
  const timeDiff = now - lastInputTimestamp;
  lastInputTimestamp = now;

  if (timeDiff > 5 && timeDiff < 1000) {
    inputIntervals.push(timeDiff);
    if (inputIntervals.length > 5) inputIntervals.shift();
  }

  const averageInterval =
    inputIntervals.reduce((a, b) => a + b, 0) / (inputIntervals.length || 1);
  const cps = 1000 / averageInterval;

  // ИСПРАВЛЕНИЕ: Ботик реагирует ТОЛЬКО на высокую скорость набора (> 3.5 символов в секунду)
  if (currentTextLen > 0 && cps > 3.5) {
    spyBot.classList.add("visible", "reading");
    document.documentElement.style.setProperty("--bot-eye-color", "#f43f5e"); // Глаза краснеют от удивления скорости

    // Эффекты яростного набора текста на форме
    if (cps > 6) {
      formCard.classList.remove("rage-speed-1");
      formCard.classList.add("rage-speed-2");
      triggerHaptic("light"); // Легкая микровибрация только при бешеной печати
    } else {
      formCard.classList.remove("rage-speed-2");
      formCard.classList.add("rage-speed-1");
    }

    clearTimeout(botActiveTimeout);
    botActiveTimeout = setTimeout(() => {
      spyBot.classList.remove("visible", "reading");
      formCard.classList.remove("rage-speed-1", "rage-speed-2");
      document.documentElement.style.setProperty("--bot-eye-color", "#feb47b");
    }, 1600); // Быстро прячется обратно при остановке печати
  } else {
    // При медленной печати ботик спит, эффекты ярости убраны
    formCard.classList.remove("rage-speed-1", "rage-speed-2");
  }

  evaluateBossAndCombos();
});

// Анимация ботика при обычном фокусе на строку
textarea.addEventListener("focus", () => {
  spyBot.classList.add("focus-active");
  document.querySelector(".sphere-1").style.opacity = "0.35";
  document.querySelector(".sphere-2").style.opacity = "0.35";
});
textarea.addEventListener("blur", () => {
  spyBot.classList.remove("focus-active");
  document.querySelector(".sphere-1").style.opacity = "0.2";
  document.querySelector(".sphere-2").style.opacity = "0.2";
});

inputName.addEventListener("input", evaluateBossAndCombos);

function evaluateBossAndCombos() {
  const nameVal = inputName.value.trim().toLowerCase();
  const isBoss = nameVal === "зяблик" || nameVal === "zyablick";
  const submitBtn = document.getElementById("submitBtn");

  if (isBoss) {
    mainTitle.classList.add("boss-mode");
  } else {
    mainTitle.classList.remove("boss-mode");
  }

  if (textarea.value.length > 0) {
    if (isBoss && selectedCategory === "🐈 Поток чистого..мефа") {
      submitBtn.classList.add("rainbow-mode");
      submitBtnText.textContent = "ШЕФ, ВЫ! ОТПРАВЛЯЕМ! 👑🛸";
    } else {
      submitBtn.classList.remove("rainbow-mode");
      submitBtnText.textContent = isBoss
        ? "Привет, шеф! Отправляем... 👑"
        : "Отправить🚀";
    }
  } else {
    submitBtn.classList.remove("rainbow-mode");
    submitBtnText.textContent = "Отправить";
  }
}

// Переключение категорий фидбека
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    triggerHaptic("light");
    playAudioClick(280);
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.getAttribute("data-category");

    const icon = btn.querySelector(".btn-icon");
    if (icon) {
      icon.style.transform = "scale(1.4) translateY(-4px)";
      setTimeout(() => (icon.style.transform = "scale(1) translateY(0)"), 220);
    }
    evaluateBossAndCombos();
  });
});

// Сабмит и отправка формы фидбека
document
  .getElementById("complaintForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!textarea.value.trim()) {
      triggerHaptic("double");
      playAudioClick(140, 0.12);
      textarea.classList.add("shake-error");
      setTimeout(() => textarea.classList.remove("shake-error"), 400);
      return;
    }

    triggerHaptic("double");
    // Робот совершает прыжок (пожирает / уносит текст с собой)
    spyBot.classList.add("visible", "jump-attack");

    const token = "8917335767:AAFvu--NqNrpsJbtDes3LzWTejKOn5mIDZI";
    const chatId = "8165651266";
    const name = inputName.value.trim() || "Аноним";
    const text = textarea.value.trim();
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtnText.innerHTML =
      'Шифрование канала... <div class="spinner"></div>';

    const message =
      `🔮 *Новое уведомление: Табачка-Фидбек*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📁 *Тема:* _${selectedCategory}_\n` +
      `👤 *Отправитель:* \`${name}\`\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 *Текст сообщения:* \n"${text}"`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        const randomMeme =
          catMemes[Math.floor(Math.random() * catMemes.length)];
        document.getElementById("memeFact").textContent = randomMeme.text;
        document.getElementById("memeImage").src = randomMeme.img;

        document.getElementById("successModal").classList.remove("hidden");
        spawnParticlesExplosion();

        document.getElementById("complaintForm").reset();
        mainTitle.classList.remove("boss-mode");
        submitBtn.classList.remove("rainbow-mode");
        charCount.textContent = "0";
        charCount.style.color = "#4b5563";
        progressBarFill.style.width = "0%";
        submitBtnText.textContent = "Отправить";
      } else {
        alert("Ошибка отправки скрипта Telegram API.");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка соединения.");
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        spyBot.classList.remove("visible", "jump-attack");
      }, 650);
    }
  });

document.getElementById("closeModalBtn").addEventListener("click", () => {
  triggerHaptic("light");
  playAudioClick(340);
  document.getElementById("successModal").classList.add("hidden");
});
