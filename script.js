"use strict";

const form = document.getElementById("complaintForm");
const textarea = document.getElementById("complaintText");
const fileInput = document.getElementById("fileInput");
const recordBtn = document.getElementById("recordBtn");
const submitBtn = document.getElementById("submitBtn");
const categoryButtons = document.querySelectorAll(".category-btn");
const recipientGroup = document.getElementById("recipientGroup");
let mediaRecorder;
let audioChunks = [];
let selectedCategory = "💬 Свободное общение";

// Логика категорий[cite: 7]
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.getAttribute("data-category");
    recipientGroup.style.display =
      selectedCategory === "💌 Анонимное послание" ? "block" : "none";
  });
});

// Запись голоса[cite: 7]
recordBtn.onclick = async () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    recordBtn.textContent = "🎙 Голос";
  } else {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRecorder.onstop = sendAudio;
    mediaRecorder.start();
    recordBtn.textContent = "⏹ Стоп";
  }
};

async function sendAudio() {
  const audioBlob = new Blob(audioChunks, { type: "audio/ogg" });
  const formData = new FormData();
  formData.append("chat_id", "8165651266");
  formData.append("voice", audioBlob);
  await fetch(
    `https://api.telegram.org/bot8917335767:AAFvu--NqNrpsJbtDes3LzWTejKOn5mIDZI/sendVoice`,
    { method: "POST", body: formData },
  );
  audioChunks = [];
  alert("Голосовое отправлено!");
}

// Отправка формы с индикацией[cite: 7]
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Отправка...';

  const token = "8917335767:AAFvu--NqNrpsJbtDes3LzWTejKOn5mIDZI";
  const formData = new FormData();
  formData.append("chat_id", "8165651266");
  formData.append(
    "caption",
    `Категория: ${selectedCategory}\nНик: ${document.getElementById("username").value}\nТекст: ${textarea.value}`,
  );

  if (fileInput.files.length > 0) {
    formData.append("photo", fileInput.files[0]);
    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  } else {
    formData.append("text", formData.get("caption"));
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      body: formData,
    });
  }

  document.getElementById("successModal").classList.remove("hidden");
  submitBtn.disabled = false;
  submitBtn.innerHTML = "Отправить";
  form.reset();
});

document.getElementById("closeModalBtn").onclick = () =>
  document.getElementById("successModal").classList.add("hidden");
