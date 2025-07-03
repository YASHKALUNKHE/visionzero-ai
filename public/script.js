// 🌙 Theme Toggle with Persistence
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
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
    simulateAIAnalysis("audio", audioFile.name);
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
    simulateAIAnalysis("media", mediaFile.name);
  }
});

// 🧠 Simulated AI Analysis + Fault Logging
function simulateAIAnalysis(fileType, fileName) {
  const aiOutput = document.getElementById("aiOutput");
  aiOutput.textContent = `🔍 Analyzing ${fileName}...`;

  setTimeout(() => {
    const result =
      fileType === "audio"
        ? "🔧 Fault Detected: Timing Belt Slack (Confidence: 87%)"
        : "⚠️ Crack Detected on Surface (Confidence: 91%)";

    aiOutput.textContent = result;

    // Update Fault History
    const historyBody = document.getElementById("historyBody");
    const newRow = document.createElement("tr");
    const now = new Date().toLocaleString();
    newRow.innerHTML = `
      <td>${fileType.toUpperCase()}</td>
      <td>${now}</td>
      <td>${result}</td>
    `;
    historyBody.prepend(newRow);
  }, 2000);
}

// 🔊 Live Audio Visualizer
const fileInput = document.getElementById("audioFile");
const audioPlayer = document.getElementById("audioPlayer");
const canvas = document.getElementById("audioCanvas");
const canvasCtx = canvas.getContext("2d");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    const audioURL = URL.createObjectURL(file);
    audioPlayer.src = audioURL;
    audioPlayer.play().then(() => {
      visualize(audioPlayer);
    }).catch(err => {
      console.error("Autoplay prevented. User interaction required.", err);
    });
  }
});

function visualize(audioElement) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = "rgba(99, 102, 241, 0.2)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i];
      canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 240)`;
      canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  }

  // Resume AudioContext if it was suspended (Chrome fix)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  draw();
}
