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
      return "Our pricing reflects the exceptional quality and craftsmanship that goes into every garment. Here's our comprehensive pricing structure:\n\n• **Custom Men's Suits**: Starting from $800 - includes premium cotton fabric, basic customizations, and 2 fittings\n• **Women's Dresses**: From $600 - elegant designs with made-to-measure fitting\n• **Evening Gowns**: Starting at $1,200 - luxury fabrics with intricate detailing\n• **Wedding Attire**: From $1,500 - includes bridal gowns and formal suits\n• **Business Attire**: Starting at $700 - professional looks for modern professionals\n• **Casual Wear**: From $400 - comfortable yet stylish everyday pieces\n\n**Fabric Upgrades**: Premium wool (+30%), Pure silk (+80%), Cashmere (+150%), Luxury velvet (+60%)\n\n**Popular Add-ons**: Personal monogram ($50), Custom lining ($100), Hand embroidery ($150), Rush orders ($200)\n\nUse our **Price Calculator** tool on this website for an instant detailed quote, or book a consultation for personalized pricing based on your specific requirements!";
    }
    
    // Appointment booking
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return "Booking your appointment is easy and we offer multiple convenient options:\n\n**Online Booking**: Use our appointment form right here on this website - simply scroll down to the 'Get In Touch' section and fill out your details. We'll respond within 24 hours.\n\n**Phone Consultation**: Call us directly at +1 (231) 8864-08234 for immediate scheduling. Our team is available Monday through Saturday, 10:00 AM - 7:00 PM.\n\n**Virtual Consultation**: We now offer video consultations for initial discussions about your project, fabric selection, and style preferences.\n\n**What to Expect**: Your first appointment includes a detailed consultation (45-60 minutes), initial measurements using our advanced Virtual Fitting Room technology, fabric selection from our premium collection, and style discussion with our master tailors.\n\n**Preparation Tips**: Bring any inspiration photos, wear well-fitting undergarments, and come prepared to discuss your lifestyle, preferences, and the occasions you'll wear the garment.\n\nWe recommend booking 2-3 weeks in advance, especially during wedding season (April-October) and holiday periods.";
    }
    
    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "Mett-Apperals offers a comprehensive range of luxury tailoring services, each designed to exceed your expectations:\n\n**🎯 Made-to-Measure**: Our signature service where we create garments based on your exact measurements and style preferences. This includes detailed consultations, premium fabric selection, and multiple fittings to ensure perfection.\n\n**✂️ Bespoke Tailoring**: The ultimate in luxury - completely handcrafted garments created from scratch exclusively for you. This includes pattern creation, hand-cut fabrics, and extensive hand-sewing by our master craftsmen.\n\n**🔧 Professional Alterations**: Expert alterations for both our garments and pieces from other sources. We handle hemming, taking in/letting out, sleeve adjustments, and complex reconstructions.\n\n**👔 Personal Styling**: Our style consultants work with you to develop a complete wardrobe strategy, including color analysis, style recommendations, and seasonal updates.\n\n**💍 Wedding Specialists**: Complete wedding party attire including bridal gowns, groom's suits, bridesmaid dresses, and formal accessories.\n\n**🏢 Corporate Wardrobe**: Professional attire programs for executives and business professionals, including seasonal collections and wardrobe maintenance.\n\n**Advanced Features**: Virtual Fitting Room technology, AI-powered Price Calculator, and personalized shopping cart system for seamless ordering.";
    }
    
    // Timing questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('when ready')) {
      return "Our timeline depends on the complexity and type of garment, but here's what you can typically expect:\n\n**Made-to-Measure Garments**:\n• Simple pieces (shirts, blouses): 2-3 weeks\n• Suits and dresses: 3-4 weeks\n• Complex evening wear: 4-6 weeks\n\n**Bespoke Tailoring**:\n• Custom suits: 6-8 weeks\n• Evening gowns: 8-12 weeks\n• Wedding attire: 10-16 weeks (book early!)\n\n**Alterations**:\n• Simple hems: 3-5 days\n• Basic adjustments: 5-7 days\n• Complex alterations: 1-2 weeks\n\n**Rush Orders**: Available for an additional $200 fee - we can complete most garments in 1 week for urgent needs.\n\n**The Process**: Initial consultation → Measurements & fabric selection → First fitting (50% complete) → Second fitting (90% complete) → Final fitting & delivery\n\n**Seasonal Considerations**: Allow extra time during peak seasons (wedding season April-October, holiday season November-December). We recommend booking 4-6 weeks ahead during these periods.\n\nWe'll provide you with an exact timeline and milestone schedule during your consultation, and send regular updates throughout the process.";
    }
    
    // Location
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
      return "Visit our beautiful flagship studio in the heart of New York's Fashion District:\n\n**📍 Address**: 123 Tailor Street, Fashion District, NY 10001\n\n**🕒 Hours**:\n• Monday - Friday: 10:00 AM - 7:00 PM\n• Saturday: 10:00 AM - 6:00 PM\n• Sunday: Closed (Private appointments available)\n\n**🚇 Transportation**:\n• Subway: 2 blocks from 34th St-Herald Square (B,D,F,M,N,Q,R,W)\n• Parking: Valet parking available, street parking, nearby garages\n\n**🏢 Studio Features**:\n• 3,000 sq ft showroom with natural lighting\n• Private fitting rooms with 360-degree mirrors\n• Extensive fabric library with over 500 premium options\n• Climate-controlled storage for works in progress\n• Comfortable consultation areas with refreshments\n\n**♿ Accessibility**: Fully wheelchair accessible with elevator access and wide fitting rooms.\n\n**🎯 What's Nearby**: Located in the heart of NYC's garment district, surrounded by fabric stores, fashion showrooms, and excellent restaurants for post-appointment dining.\n\nFree consultation available - just call ahead or use our online booking system!";
    }
    
    // Fabric questions
    if (lowerMessage.includes('fabric') || lowerMessage.includes('material')) {
      return "We source only the finest fabrics from renowned mills worldwide. Our extensive collection includes:\n\n**🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premium Wools**:\n• Loro Piana Super 150s-180s\n• Ermenegildo Zegna collections\n• Holland & Sherry luxury wools\n• Dormeuil and Scabal premium lines\n\n**🇮🇹 Italian Silks**:\n• Pure mulberry silk from Como\n• Silk blends for durability\n• Printed and solid options\n• Seasonal collections updated quarterly\n\n**🌿 Natural Fibers**:\n• Egyptian cotton (premium and organic)\n• Belgian and Irish linens\n• Cashmere from Scotland and Mongolia\n• Alpaca and mohair blends\n\n**✨ Luxury Options**:\n• Vicuña (ultra-rare, by special order)\n• Qiviut (musk ox wool)\n• Sea Island cotton\n• Vintage fabrics from exclusive collections\n\n**🎨 Customization**:\n• Over 500 fabric options in stock\n• Custom weaving available\n• Exclusive patterns and colors\n• Seasonal trend collections\n\n**📱 Digital Tools**: Use our interactive Fabric Visualizer on this website to see how different materials will look on your chosen garment style.\n\nDuring your consultation, we'll help you select the perfect fabric based on your lifestyle, climate, care preferences, and aesthetic goals.";
    }
    
    // Alterations
    if (lowerMessage.includes('alteration') || lowerMessage.includes('alter') || lowerMessage.includes('fix')) {
      return "Our expert alteration services can transform any garment to achieve the perfect fit:\n\n**🔧 Common Alterations**:\n• Hemming (pants, skirts, dresses)\n• Taking in or letting out (waist, chest, hips)\n• Sleeve adjustments (length and width)\n• Shoulder adjustments (complex but possible)\n• Tapering and reshaping\n\n**👔 Suit Alterations**:\n• Jacket: chest, waist, length, sleeves\n• Trousers: waist, inseam, taper, rise\n• Complete suit restyling and modernization\n\n**👗 Dress Alterations**:\n• Size adjustments (up to 2 sizes)\n• Length modifications\n• Neckline and sleeve changes\n• Adding or removing details\n\n**💍 Wedding Dress Specialists**:\n• Bridal gown fitting and alterations\n• Bustle installation\n• Emergency repairs\n• Preservation preparation\n\n**⚡ Rush Services**: Same-day and next-day alterations available for urgent needs (additional fees apply).\n\n**🏷️ Pricing**: Simple hems from $50, basic adjustments from $75, complex alterations from $150. We provide detailed quotes before starting any work.\n\n**📋 Process**: Assessment → Quote → Approval → Alteration → Quality check → Pickup\n\n**✅ Guarantee**: All alterations come with our satisfaction guarantee - if you're not happy, we'll make it right.\n\nBring your garments in for a free assessment and quote!";
    }
    
    // Wedding
    if (lowerMessage.includes('wedding') || lowerMessage.includes('bride') || lowerMessage.includes('groom')) {
      return "Congratulations on your upcoming wedding! Mett-Apperals specializes in creating unforgettable wedding attire:\n\n**👰 Bridal Services**:\n• Custom wedding gowns from $1,500\n• Bridesmaid dress coordination\n• Mother-of-the-bride outfits\n• Reception dress options\n• Veil and accessory coordination\n\n**🤵 Groom's Attire**:\n• Custom tuxedos and formal suits\n• Groomsmen coordination\n• Father-of-the-bride/groom suits\n• Accessories (bow ties, cufflinks, pocket squares)\n\n**💎 Premium Features**:\n• Hand-beading and embroidery\n• Custom lace applications\n• Heirloom fabric incorporation\n• Matching couple elements\n• Seasonal color coordination\n\n**📅 Timeline Planning**:\n• Book 6-12 months in advance\n• Initial consultation: Design and measurements\n• First fitting: 8-10 weeks before wedding\n• Second fitting: 4-6 weeks before\n• Final fitting: 1-2 weeks before\n• Emergency alterations available\n\n**🎁 Wedding Packages**:\n• Bridal party coordination discounts\n• Complimentary groom's accessories with bridal gown\n• Free garment preservation consultation\n• Anniversary alteration services\n\n**✨ Special Services**:\n• Destination wedding consultations\n• Travel cases for gown transport\n• On-site emergency alterations\n• Post-wedding cleaning and preservation\n\n**📞 Wedding Specialist**: Book a consultation with our dedicated wedding team to discuss your vision, timeline, and budget. We'll make your special day absolutely perfect!";
    }
    
    // Contact info
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "We're here to help and easy to reach through multiple channels:\n\n**📞 Phone**: +1 (231) 8864-08234\n• Direct line to our customer service team\n• Available Monday-Saturday, 10:00 AM - 7:00 PM\n• Emergency alterations hotline available\n\n**📧 Email**: info@mettapperals.com\n• General inquiries and appointments\n• Response within 24 hours (usually much faster)\n• Detailed consultations available via email\n\n**🌐 Website Contact Form**: Located in the 'Get In Touch' section below\n• Secure and convenient\n• Automatically routes to appropriate department\n• Upload photos and inspiration images\n\n**📱 Social Media**:\n• Instagram: @mettapperals (daily inspiration)\n• Facebook: Mett-Apperals (customer stories)\n• Pinterest: Latest trends and collections\n\n**💬 Live Chat**: This AI assistant is available 24/7 for immediate answers to common questions.\n\n**🏢 In-Person**: Visit our studio at 123 Tailor Street, Fashion District, NY 10001\n• Walk-ins welcome for consultations\n• Private appointment rooms available\n• Complimentary refreshments\n\n**🚨 Emergency Services**: For urgent alterations or wedding emergencies, call our main number and press 1 for immediate assistance.\n\n**📧 Departments**:\n• Appointments: appointments@mettapperals.com\n• Alterations: alterations@mettapperals.com\n• Weddings: weddings@mettapperals.com\n\nWe pride ourselves on exceptional customer service and quick response times!";
    }
    
    // Virtual Fitting Room
    if (lowerMessage.includes('virtual') || lowerMessage.includes('fitting room') || lowerMessage.includes('measurements')) {
      return "Our cutting-edge Virtual Fitting Room technology revolutionizes the custom tailoring experience:\n\n**🎯 How It Works**:\n• 8-step guided measurement process\n• Interactive body diagrams with precise positioning\n• Smart input validation with helpful tips\n• Real-time measurement verification\n• Secure storage of your measurement profile\n\n**📏 Measurements Captured**:\n• Chest, waist, and hip circumference\n• Shoulder width and arm length\n• Inseam and overall height\n• Weight for proportion calculations\n• Additional measurements for specific garments\n\n**✨ Advanced Features**:\n• Visual measurement guides with animations\n• Measurement tips from master tailors\n• Progress tracking through each step\n• Instant measurement profile creation\n• Email integration to send measurements directly to our team\n\n**🔒 Privacy & Security**:\n• All measurements stored locally on your device\n• Optional cloud backup with encryption\n• No personal data shared without consent\n• Easy profile deletion anytime\n\n**🎨 Integration**:\n• Works seamlessly with our Price Calculator\n• Connects to appointment booking system\n• Syncs with your shopping cart\n• Available on all devices (mobile, tablet, desktop)\n\n**💡 Pro Tips**:\n• Wear well-fitting undergarments\n• Have someone help with hard-to-reach measurements\n• Take measurements at the same time of day\n• Save multiple profiles for different family members\n\n**🚀 Try It Now**: Click the 'Virtual Fitting Room' button on this page to start your personalized measurement session!";
    }
    
    // Price Calculator
    if (lowerMessage.includes('calculator') || lowerMessage.includes('quote') || lowerMessage.includes('estimate')) {
      return "Our intelligent Price Calculator gives you instant, accurate pricing for your custom garments:\n\n**🎯 How It Works**:\n1. **Select Garment Type**: Choose from 12+ options including suits, dresses, gowns, and casual wear\n2. **Choose Premium Fabric**: Visual fabric swatches with detailed information\n3. **Add Customizations**: Select from 8+ premium add-ons\n4. **Get Instant Quote**: Real-time pricing with detailed breakdown\n\n**👔 Garment Options**:\n• Men's Suits (from $800)\n• Women's Dresses (from $600)\n• Evening Gowns (from $1,200)\n• Wedding Attire (from $1,500)\n• Business Attire (from $700)\n• Casual Wear (from $400)\n• And more specialized options\n\n**🧵 Fabric Selection**:\n• Premium Cotton (base price)\n• Fine Wool (+30%)\n• Pure Silk (+80%)\n• Belgian Linen (+20%)\n• Luxury Cashmere (+150%)\n• Duchess Satin (+40%)\n\n**✨ Customization Options**:\n• Personal Monogram (+$50)\n• Custom Lining (+$100)\n• Designer Buttons (+$75)\n• Hand Embroidery (+$150)\n• Beadwork Details (+$200)\n• Rush Order Service (+$200)\n\n**📊 Detailed Breakdown**:\n• Base garment price\n• Fabric upgrade costs\n• Individual customization fees\n• Tax calculations (8.5%)\n• Final total with all options\n\n**🛒 Seamless Integration**:\n• Add items directly to shopping cart\n• Save quotes for later reference\n• Share quotes via email or social media\n• Book consultation with pre-filled information\n\n**💡 Smart Features**:\n• Real-time price updates as you select options\n• Visual previews of fabric choices\n• Comparison tools for different configurations\n• Mobile-optimized interface\n\n**🚀 Try It Now**: Click 'Price Calculator' to get your instant custom quote!";
    }
    
    // About/History
    if (lowerMessage.includes('about') || lowerMessage.includes('history') || lowerMessage.includes('story') || lowerMessage.includes('moselyn')) {
      return "Welcome to the rich heritage of Mett-Apperals, where tradition meets innovation:\n\n**👨‍🎨 Our Founder**: Moselyn Junius established Mett-Apperals in 2010 with a vision to bring European tailoring excellence to discerning American clientele.\n\n**🏆 Our Journey**:\n• **2010**: Founded with a single master tailor and 50 fabric options\n• **2015**: Expanded to full-service atelier with 5 craftspeople\n• **2018**: Introduced made-to-measure technology and expanded fabric library\n• **2020**: Launched virtual consultation services during pandemic\n• **2023**: Pioneered Virtual Fitting Room and AI Price Calculator\n• **2024**: Now serving 500+ clients annually with 99% satisfaction rate\n\n**🎯 Our Philosophy**:\n\"Every garment should be as unique as the individual wearing it. We believe in combining time-honored techniques with modern innovation to create clothing that not only fits perfectly but tells your personal story.\"\n\n**👥 Our Team**:\n• 3 Master Tailors with 15+ years experience each\n• 2 Pattern Makers specializing in complex designs\n• 1 Fabric Specialist with global sourcing expertise\n• 2 Style Consultants for personalized wardrobe planning\n• Dedicated customer service and fitting specialists\n\n**🌟 What Sets Us Apart**:\n• Hand-finished details on every garment\n• Sustainable practices and ethical sourcing\n• Lifetime alteration services for our garments\n• Cutting-edge technology integrated with traditional craftsmanship\n• Personal relationships with each client\n\n**🏅 Recognition**:\n• Featured in New York Fashion Week 2022\n• \"Best Custom Tailor\" - NYC Style Awards 2023\n• Sustainable Fashion Leader Award 2024\n\n**💫 Our Promise**: Every piece that leaves our atelier represents our commitment to excellence, craftsmanship, and your complete satisfaction.";
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello and welcome to Mett-Apperals! 👋\n\nI'm your personal tailoring assistant, here to help you discover the world of custom clothing excellence. Whether you're looking for:\n\n• **Custom Suits & Dresses** - Made to your exact measurements\n• **Wedding Attire** - Making your special day unforgettable\n• **Professional Alterations** - Perfect fit guaranteed\n• **Premium Fabrics** - Sourced from the world's finest mills\n• **Virtual Fitting** - Try our cutting-edge measurement technology\n• **Instant Quotes** - Use our AI-powered price calculator\n\nI'm here to guide you through every step of your custom clothing journey. Founded by master tailor Moselyn Junius in 2010, we've been creating exceptional garments that reflect each client's unique style and personality.\n\n**Quick Start Options**:\n🎯 Ask me about pricing for specific garments\n📅 Learn about our appointment booking process\n👔 Explore our services and specializations\n📏 Try our Virtual Fitting Room\n💰 Get an instant quote with our Price Calculator\n\nWhat would you like to know about our custom tailoring services?";
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're absolutely welcome! 😊\n\nI'm delighted I could help you learn more about Mett-Apperals and our exceptional tailoring services. Remember:\n\n**🎯 Next Steps**:\n• Try our **Virtual Fitting Room** for precise measurements\n• Use the **Price Calculator** for instant quotes\n• Book a consultation using our contact form below\n• Call us at +1 (231) 8864-08234 for immediate assistance\n\n**💡 Don't Forget**:\n• We offer free consultations and assessments\n• Virtual appointments available for your convenience\n• Rush services for urgent needs\n• Lifetime alteration services on our garments\n\nIf you have any other questions about our custom clothing, alterations, wedding services, or anything else, I'm here 24/7 to help! Our team at Mett-Apperals is committed to making your custom clothing experience exceptional from start to finish.\n\nFeel free to ask me anything else, or contact our human specialists for personalized assistance. We look forward to creating something beautiful for you! ✨";
    }
    
    // Default response
    return "Welcome to Mett-Apperals! I'm here to provide detailed information about our luxury custom tailoring services. I can help you with:\n\n**📋 Popular Topics**:\n• **Pricing & Quotes** - Detailed pricing for all garment types\n• **Services** - Made-to-measure, bespoke, alterations, styling\n• **Appointments** - Booking, what to expect, preparation tips\n• **Fabrics** - Premium materials from world-renowned mills\n• **Wedding Services** - Bridal gowns, suits, complete wedding parties\n• **Timing** - How long different garments take to complete\n• **Virtual Fitting Room** - Our advanced measurement technology\n• **Price Calculator** - Instant quotes with customization options\n\n**🎯 Advanced Features**:\n• Try our Virtual Fitting Room for precise measurements\n• Use our Price Calculator for instant detailed quotes\n• Browse our extensive fabric collection\n• Learn about our master craftsmen and techniques\n\n**📞 Contact Information**:\n• Phone: +1 (231) 8864-08234\n• Email: info@mettapperals.com\n• Studio: 123 Tailor Street, Fashion District, NY 10001\n\nSimply ask me about any aspect of our services, and I'll provide comprehensive information to help you make the perfect choice for your custom clothing needs!";
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
