// ========================================
// CASPER2 BOT CONFIGURATION
// ========================================

export const config = {
  // ⚠️ IMPORTANT: Change this to YOUR WhatsApp number!
  // Format: CountryCode + Number (no + or spaces)
  // Example: +1 234-567-8900 = '12345678900'
  owner: '+254 734 027081', // CHANGE THIS TO YOUR NUMBER!
  
  // Bot Information
  botName: 'Casper2',
  prefix: '!',
  
  // Sudo Users (trusted users who can use bot commands)
  // Format: ['number1', 'number2']
  sudo: [],
  
  // Menu Image URL (must be direct image link)
  menuImage: 'https://files.catbox.moe/i4jr1u.jpg',
  
  // Bot Modes
  modes: {
    public: false,           // true = anyone can use | false = owner + sudo only
    autoViewStatus: true,    // Auto view all statuses
    autoReactStatus: true,   // Auto react to statuses  
    antiDelete: true,        // Save deleted messages
    chatbot: false,          // AI chatbot (responds to all messages)
    fakeTyping: true,        // Show typing indicator
    fakeRecording: false,    // Show recording indicator
  },
  
  // Emojis
  statusReactEmoji: '❤️',   // Emoji for auto-reacting to status
  viewOnceEmoji: '👀',      // React with this to save view-once messages
  
  // Settings
  maxDeletedMsgs: 100,       // Max deleted messages to store
  cooldown: 2000,            // Cooldown between commands (ms)
};

// Runtime Storage
export const storage = {
  deletedMessages: [],
  deletedStatuses: [],
  viewedStatuses: new Set(),
  commandCooldown: {},
};

// Helper Functions
export function getNumber(jid) {
  return jid.split('@')[0];
}

export function isOwner(jid) {
  return getNumber(jid) === config.owner;
}

export function isSudo(jid) {
  return config.sudo.includes(getNumber(jid));
}

export function canUse(jid) {
  if (config.modes.public) return true;
  return isOwner(jid) || isSudo(jid);
}

export function checkCooldown(jid) {
  if (isOwner(jid)) return true; // Owner no cooldown
  
  const number = getNumber(jid);
  const now = Date.now();
  
  if (storage.commandCooldown[number]) {
    if (now - storage.commandCooldown[number] < config.cooldown) {
      return false;
    }
  }
  
  storage.commandCooldown[number] = now;
  return true;
  }
    
