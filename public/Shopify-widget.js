// widget.js (simplified for Shopify)
(function() {
    const script = document.currentScript || document.querySelector('script[data-chatbot]');
    if (!script) return;
  
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      .chatbot-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: ${script.getAttribute('data-button-color') || '#007bff'};
        /* ... other styles ... */
      }
    `;
    document.head.appendChild(style);
  
    // Create toggle button and container
    const container = document.createElement('div');
    container.className = 'chatbot-container';
    container.innerHTML = `
      <div class="chat-messages"></div>
      <input class="chat-input" placeholder="Type your message..." />
    `;
  
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'chatbot-toggle';
    toggleBtn.textContent = 'Chat';
  
    // Toggle logic
    toggleBtn.addEventListener('click', () => {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });
  
    document.body.appendChild(toggleBtn);
    document.body.appendChild(container);
  })();