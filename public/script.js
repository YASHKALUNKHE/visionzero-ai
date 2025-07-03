// 🌙 Theme Toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 🎙️ Audio Upload Form Handler
document.getElementById("audioForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const audioFile = document.getElementById("audioInput").files[0];
  const statusMsg = document.getElementById("audioStatus");

  if (!audioFile) {
    statusMsg.textContent = "❌ Please select an audio file.";
    statusMsg.style.color = "red";
    return;
  }

  const validTypes = ["audio/mp3", "audio/wav", "audio/mpeg"];
  if (!validTypes.includes(audioFile.type)) {
    statusMsg.textContent = "❌ Invalid file. Only MP3 or WAV allowed.";
    statusMsg.style.color = "red";
  } else {
    statusMsg.textContent = "✅ Audio uploaded successfully!";
    statusMsg.style.color = "green";
  }
});

// 🎞️ Media Upload Form Handler
document.getElementById("mediaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const mediaFile = document.getElementById("mediaInput").files[0];
  const statusMsg = document.getElementById("mediaStatus");

  if (!mediaFile) {
    statusMsg.textContent = "❌ Please select a media file.";
    statusMsg.style.color = "red";
    return;
  }

  const validMediaTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime"];
  if (!validMediaTypes.includes(mediaFile.type)) {
    statusMsg.textContent = "❌ Invalid file. Allowed: JPG, PNG, MP4, MOV";
    statusMsg.style.color = "red";
  } else {
    statusMsg.textContent = "✅ Media uploaded successfully!";
    statusMsg.style.color = "green";
  }
});

