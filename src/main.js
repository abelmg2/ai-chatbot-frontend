import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// In your Vue.js app (Netlify frontend)
window.addEventListener('resize', () => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'chatbotResize', height }, '*');
});
