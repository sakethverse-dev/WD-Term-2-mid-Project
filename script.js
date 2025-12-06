const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition is not supported. Use Google Chrome.");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

const output = document.getElementById("output");
const status = document.getElementById("status");
const notes = document.getElementById("notes");

recognition.onstart = () => (status.textContent = "Listening...");
recognition.onend = () => (status.textContent = "Not listening");

recognition.onresult = (event) => {
  let text = "";
  for (let i = 0; i < event.results.length; i++) {
    text += event.results[i][0].transcript;
  }
  output.value = text;
};

document.getElementById("start").onclick = () => recognition.start();
document.getElementById("stop").onclick = () => recognition.stop();

document.getElementById("save").onclick = () => {
  if (!output.value.trim()) return;
  const li = document.createElement("li");
  li.textContent = output.value;
  notes.appendChild(li);
  output.value = "";
};
