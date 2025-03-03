<template>
    <div class="chat-wrapper">
      <!-- Top Bar / Header -->
      <div class="top-bar">
        <h2>Hello there 👋</h2>
        <p>Need help? How can I assist you today?</p>
        
        <!-- Search Bar -->
        <!-- <div class="search-container">
          <input
            type="text"
            placeholder="Search for answers"
            class="search-input"
          />
          <button class="search-btn">
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
                   1.415-1.414l-3.867-3.867zm-5.242.656a5 5 0 1 1 0-10 
                   5 5 0 0 1 0 10z"
              />
            </svg>
          </button>
        </div> -->
        <!-- New Conversation Button -->
      </div>
      
      <!-- Chat Box -->
      <div class="chat-box" ref="chatBox">
        <div class="new-conversation">
            <button class="new-conversation-btn" @click="startNewConversation">
            + New Conversation
            </button>
        </div>
        <transition-group name="fade" tag="div" class="messages-wrapper">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.type]"
          >
            {{ msg.text }}
            <div class="timestamp">{{ msg.timestamp }}</div>
          </div>
        </transition-group>
      </div>
  
      <!-- Input Area -->
      <div class="input-area">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="chat-input"
        />
        <button @click="sendMessage" class="send-btn">Send</button>
      </div>
    </div>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    name: "Chatbot",
    data() {
      return {
        userInput: "",
        messages: []
      };
    },
    /* mounted() {
      // Initialize chat with a greeting
      this.messages.push({
        text: "Hello! How can I assist you today?",
        type: "bot",
        timestamp: new Date().toLocaleString()
      });
      this.scrollToBottom();
    }, */
    methods: {
      async sendMessage() {
        if (!this.userInput.trim()) return;
        // Push user message
        this.messages.push({
          text: this.userInput,
          type: "user",
          timestamp: new Date().toLocaleString()
        });
        const userMessage = this.userInput;
        this.userInput = "";
        this.scrollToBottom();
  
        try {
          // Call your backend API
          const response = await axios.post("https://my-ai-chatbot-backend.glitch.me/chat", {
            message: userMessage
          });
          // Push bot reply
          this.messages.push({
            text: response.data.reply,
            type: "bot",
            timestamp: new Date().toLocaleString(),
          });
        } catch (error) {
          console.error(error);
          this.messages.push({
            text: "Error: Unable to connect to chatbot.",
            type: "error",
            timestamp: new Date().toLocaleString()
          });
        }
        this.scrollToBottom();
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const chatBox = this.$refs.chatBox;
          if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
          }
        });
      },
      startNewConversation() {
        // Reset the chat
        this.messages = [
          {
            text: "Hi! How can I help you?",
            type: "bot",
            timestamp: new Date().toLocaleString()
          }
        ];
        this.userInput = "";
        this.scrollToBottom();
      }
    }
  };
</script>
  
<style scoped>
  /* Wrapper for the entire component */
  .chat-wrapper {
    max-width: 400px;
    margin: 40px auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  
  /* Top Bar (Header) */
  .top-bar {
    background-color: #8b4513; /* Brownish color to match the reference */
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .top-bar h2 {
    margin: 0 0 10px;
    font-size: 1.5rem;
  }
  
  .top-bar p {
    margin: 0 0 15px;
  }
  
  /* Search Bar */
  .search-container {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
  }
  .search-input {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 4px 0 0 4px;
    outline: none;
    font-size: 0.9rem;
  }
  .search-btn {
    background-color: #6b3d07;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 0 16px;
    cursor: pointer;
    color: #fff;
  }
  
  .new-conversation {
    background-color: white;
    padding: 15px;
    margin-left: 5px;
    margin-right: 7px;
    margin-bottom: 30px;
    border: 0.5px solid #ddd;
  }
  /* New Conversation Button */
  .new-conversation-btn {
    background-color: #6b3d07;
    color: #fff;
    width: 95%;
    border: none;
    padding: 14px 5px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 7px;
    font-size: 0.9rem;
    transition: background 0.3s;
  }
  .new-conversation-btn:hover {
    background-color: #8b4513;
  }
  
  /* Chat Area */
  .chat-box {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f7f9fc;
  }
  
  .messages-wrapper {
    display: flex;
    flex-direction: column;
  }
  /* Message Styles */
  .message {
    margin-bottom: 12px;
    padding: 10px 16px;
    border-radius: 20px;
    max-width: 80%;
    word-wrap: break-word;
    position: relative;
    font-size: 0.95rem;
  }
  .message.user {
    background-color: #dcf8c6;
    /* align-self: flex-start; */
    /* justify-self: flex-start; */
    margin-right: auto;
  }
  .message.bot {
    background-color: #ececec;
    /* align-self: flex-end; */
    /* justify-self: flex-end; */
    margin-left: auto;
  }
  .message.error {
    background-color: #ffcccc;
    align-self: center;
  }
  
  /* Timestamp styling (optional) */
  .timestamp {
    font-size: 0.75rem;
    color: #888;
    margin-top: 4px;
  }
  
  /* Input Area */
  .input-area {
    display: flex;
    border-top: 1px solid #ddd;
    padding: 10px;
    background: #fff;
  }
  .chat-input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    outline: none;
    font-size: 16px;
    transition: border 0.3s;
  }
  .chat-input:focus {
    border-color: #007bff;
  }
  .send-btn {
    margin-left: 10px;
    padding: 0 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .send-btn:hover {
    background-color: #0056b3;
  }
  
  /* Fade Transition for Messages */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
  