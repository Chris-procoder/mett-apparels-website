// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotWindow = document.getElementById('chatbot-window');
  const closeChat = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const chatMessages = document.getElementById('chat-messages');

  // Toggle chatbot window
  chatbotButton.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'block' : 'none';
  });

  // Close chatbot
  closeChat.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
  });

  // Send message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Generate bot response
    setTimeout(() => {
      const response = generateResponse(message);
      addMessage(response, 'bot');
    }, 1000);
  }

  // Add message to chat
  function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender + '-message';
    messageDiv.style.marginBottom = '15px';

    const messageContent = document.createElement('div');
    messageContent.style.padding = '10px';
    messageContent.style.borderRadius = '10px';
    messageContent.style.maxWidth = '80%';
    
    if (sender === 'user') {
      messageContent.style.background = '#d4af37';
      messageContent.style.color = 'white';
      messageContent.style.marginLeft = 'auto';
      messageDiv.style.textAlign = 'right';
    } else {
      messageContent.style.background = '#e9e9e9';
      messageContent.style.color = '#333';
    }

    messageContent.innerHTML = `<p style="margin: 0; font-size: 14px;">${message}</p>`;
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Generate bot response based on keywords
  function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return "Our pricing varies based on the type of garment and customization level. Custom suits start from $800, dresses from $600, and alterations from $50. For an accurate quote, please book a consultation with us!";
    }
    
    // Appointment booking
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return "You can book an appointment using our contact form on this page, or call us at +1 (555) 123-4567. We're available Mon-Sat, 10:00 AM - 7:00 PM.";
    }
    
    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "We offer Made-to-Measure clothing, Alterations, Bespoke Tailoring, and Personal Styling services. Each service is tailored to your specific needs and preferences.";
    }
    
    // Timing questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('when ready')) {
      return "Custom garments typically take 2-4 weeks to complete, depending on complexity. Alterations usually take 3-7 days. We'll provide you with an exact timeline during your consultation.";
    }
    
    // Location
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
      return "We're located at 123 Tailor Street, Fashion District, NY 10001. Our studio is open Mon-Sat, 10:00 AM - 7:00 PM.";
    }
    
    // Fabric questions
    if (lowerMessage.includes('fabric') || lowerMessage.includes('material')) {
      return "We work with premium fabrics including wool, cotton, silk, linen, and luxury blends. During your consultation, we'll help you choose the perfect fabric for your garment.";
    }
    
    // Alterations
    if (lowerMessage.includes('alteration') || lowerMessage.includes('alter') || lowerMessage.includes('fix')) {
      return "Yes, we provide professional alteration services for both our garments and clothing from other sources. Common alterations include hemming, taking in/letting out, and adjusting fit.";
    }
    
    // Wedding
    if (lowerMessage.includes('wedding') || lowerMessage.includes('bride') || lowerMessage.includes('groom')) {
      return "We specialize in wedding attire! From bridal gowns to groom's suits and bridesmaid dresses, we create beautiful garments for your special day. Book a consultation to discuss your vision.";
    }
    
    // Contact info
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "You can reach us at +1 (231) 8864-08234 or email info@mettapperals.com. We're also available through our contact form on this website.";
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to Mett-Apperals. I'm here to help answer questions about our custom tailoring services. What would you like to know?";
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! If you have any other questions about our tailoring services, feel free to ask. We're here to help!";
    }
    
    // Default response
    return "I'd be happy to help you with information about our tailoring services, pricing, appointments, or location. You can also call us at +1 (231) 8864-08234 for immediate assistance!";
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Hover effect for chatbot button
  chatbotButton.addEventListener('mouseenter', () => {
    chatbotButton.style.transform = 'scale(1.1)';
  });

  chatbotButton.addEventListener('mouseleave', () => {
    chatbotButton.style.transform = 'scale(1)';
  });
});
