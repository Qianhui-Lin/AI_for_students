const chatWindow = document.getElementById("chat-window");
const chatHistory = []; // Stores full conversation

async function sendMessage() {
  const query = document.getElementById("query").value;
  if (!query.trim()) return;

  // Add user message to chat and UI
  chatHistory.push({ role: "user", content: query });
  appendMessage("user", query);
  document.getElementById("query").value = "";

  // Show "thinking" message
  appendMessage("assistant", "⏳ Thinking...");

  try {
    const response = await fetch("http://localhost:5050/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory })
    });

    const data = await response.json();
    
    // Replace "thinking" with actual response
    removeLastMessage();
    chatHistory.push({ role: "assistant", content: data.response });
    appendMessage("assistant", data.response);
  } catch (error) {
    removeLastMessage();
    appendMessage("assistant", "⚠️ Something went wrong. Please try again.");
    console.error(error);
  }
}

function appendMessage(role, content) {
  const msg = document.createElement("div");
  msg.className = `bubble ${role}`;
  msg.innerText = content;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeLastMessage() {
  const bubbles = chatWindow.getElementsByClassName("bubble");
  if (bubbles.length > 0) {
    chatWindow.removeChild(bubbles[bubbles.length - 1]);
  }
}

  