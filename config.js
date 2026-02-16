// BOT CONFIGURATION
export const config = {
  // YOUR WhatsApp number (country code + number, no +)
  owner: '+254 734 027081', // CHANGE THIS!
  
  botName: 'Casper2 Premium',
  prefix: '!',
  
  sudo: [],
  
  modes: {
    public: true,
    autoViewStatus: true,
    autoReactStatus: true,
    antiDelete: true,
    antiDeleteStatus: true,
    chatbot: false,
    fakeTyping: true,
    fakeRecording: false,
  },
  
  autoReactEmoji: '❤️',
  viewOnceEmoji: '👀',
  
  settings: {
    maxDeletedMessages: 100,
    commandCooldown: 2000,
  }
};

export const storage = {
  deletedMessages: [],
  deletedStatuses: [],
  viewedStatuses: new Set(),
  lastCommand: {},
};

export function isOwner(jid) {
  const number = jid.split('@')[0];
  return number === config.owner;
}

export function isSudo(jid) {
  const number = jid.split('@')[0];
  return config.sudo.includes(number);
}

export function isAuthorized(jid) {
  if (config.modes.public) return true;
  return isOwner(jid) || isSudo(jid);
}

export function canUseCommand(jid) {
  const number = jid.split('@')[0];
  const now = Date.now();
  
  if (isOwner(jid)) return true;
  
  if (storage.lastCommand[number] && (now - storage.lastCommand[number]) < config.settings.commandCooldown) {
    return false;
  }
  
  storage.lastCommand[number] = now;
  return isAuthorized(jid);
    }
