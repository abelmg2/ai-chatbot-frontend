(function() {
    function createChatbotWidget() {
      if (document.getElementById('chatbot-widget-container')) return;
  
      const container = document.createElement('div');
      container.id = 'chatbot-widget-container';
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: '500px',
        zIndex: '1000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        transform: 'translateY(120%)',
        transition: 'transform 0.3s ease'
      });
  
      const iframe = document.createElement('iframe');
      iframe.id = 'chatbot-iframe';
      iframe.src = document.currentScript.getAttribute('data-iframe-src') || 'https://abel-chatbot.netlify.app';
      iframe.style = 'width:100%; height:100%; border:none;';
      container.appendChild(iframe);
      document.body.appendChild(container);
    }
  
    function createToggleButton() {
      if (document.getElementById('chatbot-toggle-btn')) return;
  
      const btn = document.createElement('button');
      btn.id = 'chatbot-toggle-btn';
      btn.innerText = 'Chat';
      const btnColor = document.currentScript.getAttribute('data-button-color') || '#007bff';
      Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: btnColor,
        color: '#fff',
        border: 'none',
        zIndex: '1001',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer'
      });
  
      btn.onclick = () => {
        const container = document.getElementById('chatbot-widget-container');
        if (!container) createChatbotWidget();
        else {
          const isHidden = container.style.transform === 'translateY(120%)';
          container.style.transform = isHidden ? 'translateY(0)' : 'translateY(120%)';
        }
      };
  
      document.body.appendChild(btn);
      if (document.currentScript.getAttribute('data-auto-open') === 'true') createChatbotWidget();
    }
  
    window.addEventListener('message', (e) => {
        if (e.data.type === 'chatbotResize') {
          const container = document.getElementById('chatbot-widget-container');
          container.style.height = `${e.data.height}px`;
        }
    });

    document.addEventListener('DOMContentLoaded', createToggleButton);
  })();