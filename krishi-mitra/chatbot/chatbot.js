const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', () => {
  const messageText = userInput.value.trim();
  if (messageText === '') return; // Don't send empty messages

  // Create new user message element
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.textContent = messageText;

  // Append to chat box
  chatBox.appendChild(userMessage);

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input
  userInput.value = '';
});

// Optional: send message on Enter key
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Back button functionality
const backBtn = document.getElementById('back-btn');

if (backBtn) {
  backBtn.addEventListener('click', () => {
    history.back();
  });
}
