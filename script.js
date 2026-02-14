// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  hamburger.classList.add('active');
  navLinks.classList.add('open');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when backdrop is tapped
navOverlay.addEventListener('click', closeMenu);

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

// ===========================
// Navbar scroll effect
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// Scroll-triggered fade-in animations
// ===========================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animateObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate boat cards
document.querySelectorAll('.boat-card').forEach(el => {
  animateObserver.observe(el);
});

// Animate why items
document.querySelectorAll('.why-item').forEach(el => {
  animateObserver.observe(el);
});

// Animate section titles
document.querySelectorAll('.section-title').forEach(el => {
  animateObserver.observe(el);
});

// Animate CTA section elements
document.querySelectorAll('.cta-section h2, .cta-section p, .cta-section .btn-cta').forEach(el => {
  animateObserver.observe(el);
});

// ===========================
// Smooth scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return; // skip empty anchors
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// CHATBOT
// ===========================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Open/close chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.add('open');
  chatbotToggle.classList.add('hidden');
  chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
  chatbotContainer.classList.remove('open');
  chatbotToggle.classList.remove('hidden');
});

// Chatbot responses based on keywords
const chatbotResponses = {
  greeting: [
    "Hello! 👋 I'm here to help you with SaltLyf Cruises. What would you like to know?",
    "Hi there! Welcome to SaltLyf Cruises! How can I assist you today?",
    "Ahoy! Ready to set sail? Ask me anything about our boat rentals!"
  ],
  boat: [
    "We offer two types of boats:\n\n🚤 <strong>Pontoon Boat:</strong>\n• Up to 11 guests\n• Self-captain option available\n• Bluetooth speakers\n• Swim ladder\n• Perfect for groups and sunset cruises\n\n🎣 <strong>Fishing Boat:</strong>\n• Up to 6 guests\n• No captain – you operate\n• Rod holders\n• Livewell cooler\n• Ideal for bay fishing and exploring channels\n\nWould you like to know more about either boat?",
    "We have two amazing options:\n\n1. <strong>Pontoon Boat</strong> - Great for larger groups (up to 11) with speakers and swim ladder\n2. <strong>Fishing Boat</strong> - Perfect for fishing enthusiasts (up to 6) with rod holders\n\nBoth are self-captain rentals! Which one interests you?"
  ],
  booking: [
    "To book, simply click any of the 'Book Now' buttons on our website. This will take you to Boatsetter.com where you can:\n\n• Choose your preferred date and time\n• Select either the Pontoon or Fishing Boat\n• Complete your reservation with full payment\n\n⚠️ <strong>Important:</strong> Make sure you're booking SaltLyf Cruises boats specifically, as other rentals on Boatsetter may not be located at Port Aransas Marina.",
    "Booking is easy! Click the 'Book on Boatsetter' button and you'll be taken to our booking page where you can pick your date, time, and boat. Full payment is due at checkout. All bookings are handled securely through Boatsetter."
  ],
  location: [
    "📍 Our boats are located at:\n\n<strong>Port Aransas Marina</strong>\n301 J C Barr Blvd\nPort Aransas, TX 78373\n\nWe're the only self-captain boat rental in Port A! You can find a map link on our website.",
    "We're located at Port Aransas Marina (301 J C Barr Blvd, Port Aransas, TX 78373). It's easy to find and we're the only self-captain rental in Port Aransas!"
  ],
  price: [
    "Pricing and availability vary by date and boat type. To see current rates and available times, please visit our Boatsetter page by clicking any 'Book Now' button. You'll see real-time availability and pricing there!",
    "For the most up-to-date pricing and availability, check out our Boatsetter page. Rates depend on the date, time, and which boat you choose (Pontoon or Fishing Boat)."
  ],
  food: [
    "🍺 <strong>BYOB Policy:</strong> Yes! Our cruises are BYOB (Bring Your Own Beverages). Feel free to bring whatever drinks and snacks you'd like. We don't provide alcohol or food, so you can bring exactly what you want!",
    "Absolutely! We're BYOB, so you can bring your own beverages and snacks. We don't provide food or alcohol, which means you have the freedom to bring whatever you prefer!"
  ],
  pet: [
    "🐾 Yes! We're pet-friendly! Your furry friends are welcome on board. Just make sure they're comfortable around water and boats.",
    "Absolutely! SaltLyf Cruises is pet-friendly. Feel free to bring your pets along for the adventure!"
  ],
  time: [
    "⏰ Please arrive <strong>15 minutes prior</strong> to your scheduled cruise time. If you're more than 15 minutes late, the cruise will be canceled. We want to make sure you get the full experience!",
    "Arrive 15 minutes early! If you're more than 15 minutes late, your cruise will be canceled. This ensures you get the full rental time you paid for."
  ],
  captain: [
    "🚤 Yes! We're Port A's <strong>only self-captain boat rental</strong>. You operate the boat yourself - no captain required! This gives you the freedom to explore at your own pace. For the Pontoon, a self-captain option is available.",
    "That's right! We're the only self-captain rental in Port Aransas. You're in control - no captain needed! Perfect for those who want to explore on their own terms."
  ],
  default: [
    "I'm not sure I understood that. Could you ask about:\n• Our boats (Pontoon or Fishing Boat)\n• Booking process\n• Location\n• Pricing\n• BYOB policy\n• Pet-friendly policy\n• Arrival time\n\nOr just ask me anything else about SaltLyf Cruises!",
    "Let me help you better! You can ask me about:\n• Boat types and features\n• How to book\n• Our location in Port Aransas\n• What to bring (BYOB)\n• Pet policy\n• Arrival requirements\n\nWhat would you like to know?",
    "I'd love to help! Try asking about our boats, booking, location, or policies. What can I tell you about SaltLyf Cruises?"
  ]
};

// Function to get response based on user input
function getChatbotResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Greeting patterns
  if (input.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
    return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
  }
  
  // Boat questions
  if (input.match(/\b(boat|boats|pontoon|fishing|vessel|craft)\b/)) {
    return chatbotResponses.boat[Math.floor(Math.random() * chatbotResponses.boat.length)];
  }
  
  // Booking questions
  if (input.match(/\b(book|booking|reserve|reservation|rent|rental|how to book|where to book|boatsetter)\b/)) {
    return chatbotResponses.booking[Math.floor(Math.random() * chatbotResponses.booking.length)];
  }
  
  // Location questions
  if (input.match(/\b(location|where|address|marina|port aransas|port a|pick up|pickup)\b/)) {
    return chatbotResponses.location[Math.floor(Math.random() * chatbotResponses.location.length)];
  }
  
  // Price questions
  if (input.match(/\b(price|cost|rate|rates|pricing|how much|fee|fees|expensive|cheap)\b/)) {
    return chatbotResponses.price[Math.floor(Math.random() * chatbotResponses.price.length)];
  }
  
  // Food/drink questions
  if (input.match(/\b(food|drink|beverage|alcohol|beer|wine|byob|bring|snack|eat)\b/)) {
    return chatbotResponses.food[Math.floor(Math.random() * chatbotResponses.food.length)];
  }
  
  // Pet questions
  if (input.match(/\b(pet|pets|dog|dogs|cat|cats|animal|animals|pet friendly)\b/)) {
    return chatbotResponses.pet[Math.floor(Math.random() * chatbotResponses.pet.length)];
  }
  
  // Time/arrival questions
  if (input.match(/\b(time|when|arrive|arrival|early|late|schedule|scheduled)\b/)) {
    return chatbotResponses.time[Math.floor(Math.random() * chatbotResponses.time.length)];
  }
  
  // Captain questions
  if (input.match(/\b(captain|self-captain|self captain|operate|drive|pilot|skipper)\b/)) {
    return chatbotResponses.captain[Math.floor(Math.random() * chatbotResponses.captain.length)];
  }
  
  // Default response
  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

// Function to add message to chat
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const p = document.createElement('p');
  p.innerHTML = text;
  contentDiv.appendChild(p);
  
  messageDiv.appendChild(contentDiv);
  chatbotMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send message function
function sendMessage() {
  const userInput = chatbotInput.value.trim();
  if (!userInput) return;
  
  // Add user message
  addMessage(userInput, true);
  chatbotInput.value = '';
  
  // Simulate typing delay
  setTimeout(() => {
    const response = getChatbotResponse(userInput);
    addMessage(response, false);
  }, 500);
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Close chatbot when clicking outside (optional)
document.addEventListener('click', (e) => {
  if (chatbotContainer.classList.contains('open') && 
      !chatbotContainer.contains(e.target) && 
      !chatbotToggle.contains(e.target)) {
    // Keep it open - user might want to continue chatting
  }
});
