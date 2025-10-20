// tiny neural-like AI simulator
const styleTokens = ["😅","☕","🤖💥","…","⚡"];
const chat = document.getElementById("chat");
const promptEl = document.getElementById("prompt");
const sendBtn = document.getElementById("send");

// load memory
let memory = JSON.parse(localStorage.getItem("ai_memory") || "{}");

// AI response function
function tinyAI(prompt){
  prompt = prompt.toLowerCase();
  let base = "I am sorry for the mistakes and all";

  if(prompt.includes("really") || prompt.includes("oops")){
    base = "I am really, sor–";
  } else if(prompt.includes("joke")){
    base = "I am sorry for the mistakes and all… unless the CPU did it 🤖💥";
  }

  // sprinkle personality
  const flavor = styleTokens[Math.floor(Math.random()*styleTokens.length)];
  let response = base + " " + flavor;

  // store last prompt in memory
  memory.lastPrompt = prompt;
  localStorage.setItem("ai_memory", JSON.stringify(memory));

  return response;
}

// display message
function addMessage(text, cls){
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.onclick = () => {
  const userText = promptEl.value.trim();
  if(!userText) return;
  addMessage(userText, "user");
  promptEl.value = "";
  const botText = tinyAI(userText);
  addMessage(botText, "bot");
};
