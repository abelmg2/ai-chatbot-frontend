// widget.js
(function() {
    // Function to create the chatbot widget as an iFrame
    function createChatbotWidget() {
      // Prevent duplicate insertion if the widget already exists
      if (document.getElementById('chatbot-iframe')) return;
  
      // Create a container div for styling and positioning
      var container = document.createElement('div');
      container.id = 'chatbot-widget-container';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.width = '350px';
      container.style.height = '500px';
      container.style.zIndex = '1000';
      container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      container.style.borderRadius = '10px';
      container.style.overflow = 'hidden';
  
      // Create the iFrame element to load the chatbot
      var iframe = document.createElement('iframe');
      iframe.id = 'chatbot-iframe';
      // Replace with your deployed chatbot URL
      iframe.src = 'https://abel-chatbot.netlify.app/';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
  
      // Append the iFrame to the container, then add the container to the body
      container.appendChild(iframe);
      document.body.appendChild(container);
    }
  
    // Function to create a toggle button to show/hide the widget
    function createToggleButton() {
      if (document.getElementById('chatbot-toggle-btn')) return;
  
      var btn = document.createElement('button');
      btn.id = 'chatbot-toggle-btn';
      btn.innerText = 'Chat';
      btn.style.position = 'fixed';
      btn.style.bottom = '20px';
      btn.style.right = '20px';
      btn.style.width = '60px';
      btn.style.height = '60px';
      btn.style.borderRadius = '50%';
      btn.style.backgroundColor = '#007bff';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.zIndex = '1001';
      btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      btn.style.cursor = 'pointer';
  
      // Toggle the chatbot widget on click
      btn.onclick = function() {
        var container = document.getElementById('chatbot-widget-container');
        if (container) {
          container.style.display = container.style.display === 'none' ? 'block' : 'none';
        } else {
          createChatbotWidget();
        }
      };
  
      document.body.appendChild(btn);
    }
  
    // Initialize the widget when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      createToggleButton();
      // Optionally, you can auto-load the widget by uncommenting the next line:
      // createChatbotWidget();
    });
  })();
  