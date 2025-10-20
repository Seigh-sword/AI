sendBtn.onclick = () => {
  const userText = promptEl.value.trim();
  if(!userText) return;
  addMessage(userText, "user");
  promptEl.value = "";

  let botText = tinyAI(userText);

  // Check if botText is the fallback signal
  if(botText === "__google__") {
    const url = "https://www.google.com/search?q=" + encodeURIComponent(userText);
    window.open(url, "_blank");
    botText = "Hmm… I don’t know! But I searched the internet for you 🔍";
  }

  addMessage(botText, "bot");
};

// Modify tinyAI to return a signal instead of calling window.open directly
function tinyAI(prompt){
  prompt = prompt.toLowerCase();
  let base = "I am sorry for the mistakes and all…";

  if(prompt.includes("hello")) base = "Yo! What's up, champ? 😎";
  if(prompt.includes("really") || prompt.includes("oops")) base = "I am really, sor–";
  if(prompt.includes("joke")) base = "I am sorry for the mistakes and all… unless the CPU did it 🤖💥";

  // sprinkle personality
  const flavor = styleTokens[Math.floor(Math.random()*styleTokens.length)];
  base += " " + flavor;

  // store last prompt
  memory.lastPrompt = prompt;
  localStorage.setItem("ai_memory", JSON.stringify(memory));

  // fallback signal
  if(base.includes("…")) return "__google__";

  return base;
}
