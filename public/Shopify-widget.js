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
        width: 60px;
        height: 60px;
        border-radius: 50%;  // Makes it circular
        background: ${script.getAttribute('data-button-color') || '#007bff'};
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }
    `;

    style.textContent += `
        .chatbot-container {
            position: fixed;
            bottom: 90px;  // Position above the toggle button
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 999;
            display: none;  // Hidden by default
            transition: transform 0.3s ease;
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
        let container = document.querySelector('.chatbot-container');
        
        // Create container if it doesn’t exist
        if (!container) {
          createChatbotContainer(); // Your function to create the chat UI
          container = document.querySelector('.chatbot-container');
        }

        // Toggle with animation
        if (container.style.transform === 'translateY(0%)') {
            container.style.transform = 'translateY(120%)';
            setTimeout(() => {
            container.style.display = 'none';
            }, 300); // Match transition duration
        } else {
            container.style.display = 'block';
            setTimeout(() => {
            container.style.transform = 'translateY(0%)';
            }, 10);
        }
        // Toggle visibility
        // const isHidden = container.style.display === 'none' || container.style.transform === 'translateY(120%)';
        // container.style.display = isHidden ? 'block' : 'none';
        // container.style.transform = isHidden ? 'translateY(0)' : 'translateY(120%)';
    });
      
    document.body.appendChild(toggleBtn);
    document.body.appendChild(container);
  })();