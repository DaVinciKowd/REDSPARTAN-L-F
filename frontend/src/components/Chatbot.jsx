import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ChevronRight, CornerDownLeft } from 'lucide-react';
import '../styles/Chatbot.css';

export default function EnhancedChatBot() {
  // ----- STATE VARIABLES -----
  // Controls visibility of chat window
  const [isOpen, setIsOpen] = useState(false);
  // Stores chat conversation history
  const [messages, setMessages] = useState([]);
  // Tracks what user is typing in input field
  const [inputValue, setInputValue] = useState('');
  // Controls bot typing animation
  const [isTyping, setIsTyping] = useState(false);
  // Tracks number of unread messages when chat is closed
  const [unreadCount, setUnreadCount] = useState(0);
  
  // ----- REFS (DIRECT DOM ACCESS) -----
  // Reference to bottom of message area for scrolling
  const messagesEndRef = useRef(null);
  // Reference to input field for auto-focus
  const inputRef = useRef(null);
  
  // ----- UTILITY FUNCTIONS -----
  // Scrolls chat to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // ----- EFFECTS (SIDE OPERATIONS) -----
  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input and reset unread count when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      setUnreadCount(0);
    }
  }, [isOpen]);
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      simulateBotTyping();
      setTimeout(() => {
        addBotMessage("👋 Hi there! I'm your RedSpartanL&F assistant. How can I help you today?");
        addQuickReplies([
          "What is RedSpartanL&F",
          "How to use RedSpartanL&F",
          "Report lost/found item"
        ]);
      }, 1000);
    }
  }, [isOpen, messages.length]);
  
  // ----- MESSAGE HANDLING FUNCTIONS -----
  // Shows typing indicator
  const simulateBotTyping = () => {
    setIsTyping(true);
    scrollToBottom();
  };
  
  // Adds a bot message to the chat
  const addBotMessage = (text) => {
    setIsTyping(false);
    setMessages(prev => [...prev, {
      type: 'bot',
      content: text,
      id: Date.now()
    }]);
    
    // Increment unread count if chat is closed
    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };
  
  // Adds a user message to the chat
  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      type: 'user',
      content: text,
      id: Date.now()
    }]);
  };
  
  // Adds quick reply buttons
  const addQuickReplies = (replies) => {
    setMessages(prev => [...prev, {
      type: 'quick-replies',
      options: replies,
      id: Date.now()
    }]);
  };
  
  // Shows main menu options as quick replies
  const showMainOptions = () => {
    addQuickReplies([
      "What is RedSpartanL&F",
      "How to use RedSpartanL&F",
      "Report lost/found item",
      "FAQ",
      "Contact developers"
    ]);
  };
  
  // ----- CORE CONVERSATION LOGIC -----
  // Processes user input and generates responses
  const handleUserInput = (text) => {
    // Ignore empty messages
    if (!text.trim()) return;
    
    // Add user message and clear input
    addUserMessage(text);
    setInputValue('');
    simulateBotTyping();
    
    // Process input and find keywords
    const lowercaseText = text.toLowerCase();
    
    // Delay response to simulate thinking
    setTimeout(() => {
      // ----- RESPONSE LOGIC BASED ON KEYWORDS -----
      
      // About the system
      if (lowercaseText.includes('what is') && (lowercaseText.includes('redspartan') || lowercaseText.includes('system'))) {
        addBotMessage(`<strong>Q: What is the RedSpartan Lost and Found System?</strong><br><br>
          A: The RedSpartan Lost and Found System is a web-based platform for Batangas State University students to report, search, and claim lost or found items on campus. It streamlines the process using an interactive map and user-friendly interface.`);
        
        showMainOptions();
      }
      // About developers
      else if (lowercaseText.includes('who') && lowercaseText.includes('develop')) {
        addBotMessage(`<strong>Q: Who developed this system?</strong><br><br>
          A: The system was developed by:<br>
          • Emmanuel James Comprendio – Project Leader<br>
          • Vince Paolo Ramilo – Co-Project Leader & Backend Developer<br>
          • Kim Harrie Abel – UI/UX Designer & Frontend Developer<br>
          • Princess De Belen – Frontend Support<br>
          • Marcus Angelo Claveria – Frontend Support`);
        
        showMainOptions();
      }
      // Tutorial/usage instructions
      else if (lowercaseText.includes('tutorial') || lowercaseText.includes('how to') || lowercaseText.includes('use')) {
        addBotMessage(`<strong>How to use RedSpartanL&F:</strong><br><br>
          1. <strong>Log in</strong> using your BatStateU email account<br>
          2. <strong>Report</strong> a lost or found item with detailed description<br>
          3. <strong>Search</strong> for items using filters and keywords<br>
          4. <strong>Claim</strong> your item by providing verification<br><br>
          Need more specific instructions?`);
        
        addQuickReplies([
          "How to report an item",
          "How to search for items",
          "How to claim an item"
        ]);
      } 
      // Reporting lost items
      else if (lowercaseText.includes('report') || (lowercaseText.includes('lost') && lowercaseText.includes('item'))) {
        addBotMessage(`<strong>Q: How do I report a lost item?</strong><br><br>
          A: Log in to your account, click "Report Item," then fill in the item's name, description, location, category, and upload a photo if available.<br><br>
          <strong>To report a lost or found item:</strong><br>
          1. Click on the "Report Item" button on the dashboard<br>
          2. Select whether it's lost or found<br>
          3. Fill in item details (category, description, date, location)<br>
          4. Upload a photo if available<br>
          5. Submit your report<br><br>
          Your report will be reviewed and posted within 24 hours.`);
        
        showMainOptions();
      }
      // Searching for items
      else if (lowercaseText.includes('search')) {
        addBotMessage(`<strong>To search for items:</strong><br><br>
          1. Go to the "Find Items" section<br>
          2. Use filters (category, date, location)<br>
          3. Enter keywords in the search bar<br>
          4. Browse through matching results<br>
          5. Click on an item to view full details<br><br>
          <strong>Q: Can I search for items without logging in?</strong><br>
          A: Logging in is required to access the system.`);
        
        showMainOptions();
      }
      // Reporting found items
      else if (lowercaseText.includes('found something') || lowercaseText.includes('i found')) {
        addBotMessage(`<strong>Q: What should I do if I found something on campus?</strong><br><br>
          A: Click on "Submit Found Item," enter the item's details, and submit it. This helps reunite the item with its owner.<br><br>
          Please include as much detail as possible to help the owner identify their item!`);
        
        showMainOptions();
      }
      // Claiming process
      else if (lowercaseText.includes('claim')) {
        addBotMessage(`<strong>Q: How do I claim an item I believe is mine?</strong><br><br>
          A: Log in, find the item, click "Claim," and provide a short explanation or proof of ownership. Admins will verify your request.<br><br>
          <strong>Detailed claiming process:</strong><br>
          1. Find your item in the system<br>
          2. Click "This is mine" button<br>
          3. Provide verification details (unique identifiers)<br>
          4. Submit your claim<br>
          5. Wait for approval from the finder or admin<br>
          6. Arrange pickup at the designated campus location<br><br>
          You'll need to present your university ID during pickup.`);
        
        showMainOptions();
      }
      // Map and location features
      else if (lowercaseText.includes('map') || lowercaseText.includes('location') || lowercaseText.includes('where')) {
        addBotMessage(`<strong>Q: Where can I see where an item was found?</strong><br><br>
          A: Items are shown on an interactive campus map. Click or hover on the pins to view the item's details and submission info.<br><br>
          This makes it easy to trace your steps and find items that might have been lost in specific campus locations.`);
        
        showMainOptions();
      }
      // Data security
      else if (lowercaseText.includes('data') || lowercaseText.includes('safe') || lowercaseText.includes('security')) {
        addBotMessage(`<strong>Q: Is my data safe in this system?</strong><br><br>
          A: Yes. We use email verification, user authentication, and access controls to ensure that your personal and item data are secure.<br><br>
          The system includes secure logins, email validation, and user role permissions to ensure data privacy and system integrity.`);
        
        showMainOptions();
      }
      // About the system
      else if (lowercaseText.includes('about')) {
        addBotMessage(`<strong>About RedSpartanL&F:</strong><br><br>
          RedSpartanL&F is a digital lost and found platform developed by Batangas State University students for the Alangilan campus community. Our mission is to streamline the process of reuniting lost items with their rightful owners through a secure, user-friendly system.<br><br>
          We launched in 2023 and have already helped hundreds of students recover their lost belongings.`);
        
        showMainOptions();
      }
      // Contact info
      else if (lowercaseText.includes('contact') || lowercaseText.includes('developer')) {
        addBotMessage(`<strong>Contact Information:</strong><br><br>
          📧 Email: redspartanlandf@g.batstate-u.edu.ph<br>
          📱 Phone: +639212121021<br><br>
          For urgent matters, please email with "URGENT" in the subject line.`);
        
        showMainOptions();
      }
      // FAQ menu
      else if (lowercaseText.includes('faq')) {
        addBotMessage(`<strong>Frequently Asked Questions:</strong><br>
          Please select a question you'd like answered:`);
        
        addQuickReplies([
          "What is RedSpartanL&F",
          "Who developed this system",
          "How to report a lost item",
          "Can I search without login",
          "What if I found something",
          "How to claim an item",
          "Where to see item location",
          "Is my data safe"
        ]);
      }
      // Login requirement
      else if (lowercaseText.includes('can i search without login')) {
        addBotMessage(`<strong>Q: Can I search for items without logging in?</strong><br><br>
          A: Logging in is required to access the system.`);
        
        showMainOptions();
      }
      // General help
      else if (lowercaseText.includes('help')) {
        addBotMessage(`Need assistance? I can help with:<br><br>
          • Information about the RedSpartanL&F system<br>
          • How to report lost or found items<br>
          • Searching for items in the system<br>
          • The claiming process<br>
          • Contact information<br><br>
          Select an option below or type your question.`);
        
        showMainOptions();
      }
      // Thank you response
      else if (lowercaseText.includes('thank')) {
        addBotMessage(`You're welcome! If you have any other questions about the RedSpartanL&F system, feel free to ask anytime. Happy to help!`);
      }
      // Fallback for unrecognized inputs
      else {
        addBotMessage(`I'm not sure I understand. Can you try rephrasing your question or select one of these options?`);
        showMainOptions();
      }
    }, 1200); // Delay for typing effect
  };
  
  // ----- EVENT HANDLERS -----
  // Updates input value as user types
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Handles send button click
  const handleSubmit = () => {
    handleUserInput(inputValue);
  };
  
  // Handles Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserInput(inputValue);
    }
  };
  
  // Handles quick reply button clicks
  const handleQuickReplyClick = (reply) => {
    handleUserInput(reply);
  };
  
  // Toggles chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // First time opening - provide time-based greeting
      const currentTime = new Date();
      const hours = currentTime.getHours();
      let greeting = "Hello";
      
      if (hours < 12) {
        greeting = "Good morning";
      } else if (hours < 18) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }
      
      setTimeout(() => {
        addBotMessage(`${greeting}! 👋 I'm your RedSpartanL&F assistant. How can I help you today?`);
        addQuickReplies([
          "What is RedSpartanL&F",
          "How to use this system",
          "Report lost/found item",
          "Search for items"
        ]);
      }, 300);
    }
  };
  
  // Generates formatted time for message timestamps
  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // ----- COMPONENT RENDERING -----
  return (
    <div className="chatbot-container">
      {/* Chat button (visible when chat is closed) */}
      <div className={`chat-button ${isOpen ? 'hidden' : ''}`}>
        {/* Notification badge for unread messages */}
        {unreadCount > 0 && (
          <div className="notification-badge">
            {unreadCount}
          </div>
        )}
        <button
          onClick={toggleChat}
          className="chat-toggle-button"
          aria-label="Open chat"
        >
          <MessageCircle size={34} />
        </button>
      </div>
      
      {/* Chat window (visible when chat is open) */}
      {isOpen && (
        <div className="chat-window">
          {/* Chat header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="header-icon">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="header-title">RedSpartanL&F Assistant</h3>
                <p className="header-subtitle">Online | Batangas State University</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="close-button"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat message area */}
          <div className="message-area">
            {/* Map through messages and render based on type */}
            {messages.map((message) => {
              // Bot messages
              if (message.type === 'bot') {
                return (
                  <div key={message.id} className="message bot-message">
                    <div className="message-icon bot-icon">
                      <MessageCircle size={16} />
                    </div>
                    <div className="message-bubble bot-bubble">
                      <div 
                        className="message-content"
                        dangerouslySetInnerHTML={{ __html: message.content }} 
                      />
                      <div className="message-timestamp">
                        {getTimeString()}
                      </div>
                    </div>
                  </div>
                );
              } 
              // User messages
              else if (message.type === 'user') {
                return (
                  <div key={message.id} className="message user-message">
                    <div className="message-bubble user-bubble">
                      <div className="message-content">{message.content}</div>
                      <div className="message-timestamp user-timestamp">
                        {getTimeString()}
                      </div>
                    </div>
                    <div className="message-icon user-icon">
                      <User size={16} />
                    </div>
                  </div>
                );
              } 
              // Quick reply buttons
              else if (message.type === 'quick-replies') {
                return (
                  <div key={message.id} className="quick-replies">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        className="quick-reply-button"
                        onClick={() => handleQuickReplyClick(option)}
                      >
                        {option}
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                );
              }
              return null;
            })}
            
            {/* Bot typing indicator */}
            {isTyping && (
              <div className="message bot-message">
                <div className="message-icon bot-icon">
                  <MessageCircle size={16} />
                </div>
                <div className="message-bubble bot-bubble typing-indicator">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot delay-1"></div>
                    <div className="typing-dot delay-2"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reference for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input area */}
          <div className="input-area">
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button 
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className={`send-button ${!inputValue.trim() ? 'disabled' : ''}`}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            
            {/* Help shortcut button */}
            <div className="help-button-container">
              <button
                onClick={() => handleUserInput("Help")}
                className="help-button"
              >
                <CornerDownLeft size={12} />
                Need help? Click here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}