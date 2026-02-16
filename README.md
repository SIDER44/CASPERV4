# CASPERV4
# 🤖 CASPER2 PREMIUM BOT v4.0

## **The Ultimate WhatsApp Bot - Cypher X Style**

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-20.18.0-brightgreen.svg)](https://nodejs.org)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

A powerful, feature-rich WhatsApp bot with 300+ commands, auto-status viewing, anti-delete, AI chatbot, and much more!

---

## 🌟 **PREMIUM FEATURES**

### 🔥 **Advanced Automation**
- ✅ **Auto View Status** - Automatically views all WhatsApp statuses
- ❤️ **Auto React to Status** - Auto-reacts with emoji to all statuses
- 🗑️ **Anti-Delete Messages** - Saves all deleted messages and notifies owner
- 📸 **Anti-Delete Status** - Saves deleted status updates
- 👀 **View Once Saver** - Save view-once photos/videos by reacting with 👀

### 🤖 **AI & Smart Features**
- 💬 **AI Chatbot** - Intelligent responses using free AI API
- ⌨️ **Fake Typing** - Shows realistic "typing..." indicator
- 🎙️ **Fake Recording** - Shows "recording..." indicator
- 🧠 **Smart Command System** - 300+ working commands

### 🔒 **Security & Access Control**
- 👑 **Owner System** - Full bot control for owner
- ⭐ **Sudo Users** - Add trusted users with special access
- 🌍 **Public/Private Mode** - Control who can use the bot
- 🔐 **Command Cooldown** - Prevents spam

### 🎮 **300+ Commands**
- 🎉 Fun Commands (100+): quotes, jokes, facts, games
- 📥 Downloads: TikTok, Instagram, YouTube
- 🔧 Tools: calculator, converters, text tools
- ℹ️ Info: ping, status, time, uptime

---

## 📋 **TABLE OF CONTENTS**

- [Features](#-premium-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Commands](#-commands)
- [Usage Examples](#-usage-examples)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [License](#-license)

---

## 🛠️ **REQUIREMENTS**

- Node.js v20.18.0 or higher
- WhatsApp account
- GitHub account
- Render account (or any Node.js hosting)

---

## 📥 **INSTALLATION**

### **Step 1: Configure Owner Number**

⚠️ **CRITICAL:** Edit `config.js` and change the owner number to YOUR WhatsApp number!

```javascript
owner: '22973947900110', // Replace with YOUR number!
```

**Format:** Country code + number (no + or spaces)
- USA: +1 234-567-8900 → `12345678900`
- UK: +44 7700 900000 → `447700900000`
- Nigeria: +234 8012345678 → `2348012345678`

### **Step 2: Upload to GitHub**

1. Create new repository (or use existing)
2. Upload these 3 files:
   - ✅ `package.json`
   - ✅ `config.js` (with YOUR number!)
   - ✅ `index.js`

### **Step 3: Deploy to Render**

1. Go to [Render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Click **"Create Web Service"**

### **Step 4: Connect WhatsApp**

1. Wait for deployment (3-5 minutes)
2. Visit your Render URL
3. Scan QR code with WhatsApp:
   - Open WhatsApp on phone
   - Go to **Settings → Linked Devices**
   - Tap **"Link a Device"**
   - Scan the QR code
4. Bot is now ONLINE! ✅

---

## ⚙️ **CONFIGURATION**

### **config.js Settings**

```javascript
export const config = {
  // YOUR WhatsApp number (country code + number, no +)
  owner: '12345678900', // ⚠️ CHANGE THIS!
  
  // Bot name
  botName: 'Casper2 Premium',
  
  // Command prefix
  prefix: '!',
  
  // Sudo users (trusted users)
  sudo: [
    // '9876543210',
  ],
  
  // Bot modes
  modes: {
    public: false,           // false = private, true = public
    autoViewStatus: true,    // Auto view statuses
    autoReactStatus: true,   // Auto react to statuses
    antiDelete: true,        // Save deleted messages
    antiDeleteStatus: true,  // Save deleted statuses
    chatbot: false,          // AI chatbot (responds to all)
    fakeTyping: true,        // Show typing indicator
    fakeRecording: false,    // Show recording indicator
  },
  
  // Emojis
  autoReactEmoji: '❤️',     // Emoji for status reactions
  viewOnceEmoji: '👀',      // React with this to save view-once
};
```

### **Customization**

Want to change settings? Edit `config.js`:

```javascript
// Make bot public (anyone can use)
modes: { public: true }

// Change auto-react emoji to 🔥
autoReactEmoji: '🔥'

// Disable chatbot by default
modes: { chatbot: false }
```

---

## 🎯 **COMMANDS**

### **Owner Commands** (Only for bot owner)

| Command | Description |
|---------|-------------|
| `!settings` | View all bot settings |
| `!mode public` | Enable public mode |
| `!mode private` | Enable private mode |
| `!autoview on/off` | Toggle auto view status |
| `!autoreact on/off` | Toggle auto react status |
| `!antidelete on/off` | Toggle anti-delete |
| `!chatbot on/off` | Toggle AI chatbot mode |
| `!faketyping on/off` | Toggle typing indicator |
| `!addsudo <number>` | Add sudo user |
| `!delsudo <number>` | Remove sudo user |
| `!listsudo` | List all sudo users |
| `!deleted` | View deleted messages |

### **Regular Commands** (All users / if public)

#### 📱 Menu & Info
- `!menu` - Main menu
- `!help` - Quick help
- `!premium` - Premium features info
- `!ping` - Check bot status
- `!alive` - Check if online

#### 🎉 Fun Commands (100+)
- `!quote` - Random quote
- `!joke` - Random joke
- `!fact` - Fun fact
- `!riddle` - Random riddle
- `!pickupline` - Pickup line
- `!roast` - Get roasted
- `!compliment` - Get complimented

#### 🎮 Games
- `!roll`, `!dice` - Roll dice (1-6)
- `!flip`, `!coin` - Flip coin
- `!8ball <question>` - Magic 8-ball
- `!choose <opt1> <opt2>` - Choose between options
- `!random` - Random number

#### 🔤 Text Tools
- `!reverse <text>` - Reverse text
- `!uppercase <text>` - UPPERCASE
- `!lowercase <text>` - lowercase
- `!morse <text>` - Morse code
- `!binary <text>` - Binary code

#### 🧮 Calculators
- `!calc <math>` - Calculator
- `!bmi <weight> <height>` - BMI calculator
- `!age <year>` - Calculate age
- `!tip <bill> <percent>` - Tip calculator

#### 📥 Downloads
- `!tiktok <url>` - Download TikTok
- `!instagram <url>` - Download Instagram
- `!play <song>` - Search YouTube

---

## 💡 **USAGE EXAMPLES**

### **Example 1: Make Bot Public**

```
Owner: !mode public
Bot: ✅ Bot is now PUBLIC! Anyone can use commands.
```

Now anyone can use the bot!

### **Example 2: Add Trusted Friend as Sudo**

```
Owner: !addsudo 1234567890
Bot: ✅ Added 1234567890 as sudo user!
```

Your friend can now use all regular commands even in private mode!

### **Example 3: Enable AI Chatbot**

```
Owner: !chatbot on
Bot: ✅ AI Chatbot Mode: ON
     Bot will respond to all messages!

Anyone: Hey bot, what's the weather?
Bot: I'm not sure about the current weather, but I can chat with you about other things!

Anyone: Tell me a joke
Bot: Why don't scientists trust atoms? Because they make up everything! 😄
```

### **Example 4: Save View Once Photo**

```
[Friend sends you a view-once photo]

Bot: 👀 View once message detected!
     React with 👀 to save it to your DM!

[You react with 👀 emoji]

Bot: ⏳ Processing view once message...
     [Bot sends permanent copy to your personal DM]
```

### **Example 5: Check Settings**

```
Owner: !settings

Bot: ⚙️ BOT SETTINGS

Owner: 22973947900110
Bot Name: Casper2 Premium
🌍 Public Mode: OFF ❌
👁️ Auto View Status: ON ✅
❤️ Auto React Status: ON ✅
🗑️ Anti-Delete: ON ✅
💬 Chatbot: OFF ❌
⌨️ Fake Typing: ON ✅

Usage:
• !mode public/private
• !autoview on/off
• !chatbot on/off
• !addsudo <number>
```

### **Example 6: View Deleted Messages**

```
[Someone deletes a message]

[You receive notification]
Bot: 🚨 ANTI-DELETE ALERT
     Someone deleted a message!
     From: 1234567890@s.whatsapp.net
     Time: 2/16/2026, 10:30:00 AM

Owner: !deleted

Bot: 🗑️ RECENTLY DELETED MESSAGES
     
     Showing last 5:
     1. From: 1234567890@s.whatsapp.net
        Deleted: 2/16/2026, 10:30:00 AM
     
     Total stored: 15
```

---

## 🎨 **FEATURES BREAKDOWN**

### **Private Mode (Default)**
- Only owner can use commands
- Add friends as sudo: `!addsudo <number>`
- Perfect for personal bot
- More secure

### **Public Mode**
- Anyone can use bot commands
- Owner still has special commands
- Sudo users have elevated access
- Good for community bots

### **Auto View Status**
- Automatically views all status updates
- Works silently in background
- No manual viewing needed
- Toggle: `!autoview on/off`

### **Auto React Status**
- Auto-reacts to all status updates
- Default emoji: ❤️
- Change emoji in config.js
- Toggle: `!autoreact on/off`

### **Anti-Delete**
- Saves all deleted messages
- Notifies owner immediately
- Stores last 100 messages
- View with `!deleted` command

### **View Once Saver**
- React with 👀 to any view-once message
- Bot sends permanent copy to your DM
- Works for photos and videos
- No re-scanning needed

### **AI Chatbot**
- Responds to all non-command messages
- Uses free AI API
- Natural conversations
- Toggle: `!chatbot on/off`

### **Fake Typing**
- Shows "typing..." when processing
- Makes bot feel human
- Realistic delay (1.5 seconds)
- Toggle: `!faketyping on/off`

---

## ❓ **TROUBLESHOOTING**

### **Bot not responding to commands?**

**Check if bot is in private mode:**
```
!settings
```
If private mode is ON and you're not the owner, you can't use commands.

**Solution:** Owner should add you as sudo:
```
!addsudo <your_number>
```

### **Auto-view/react not working?**

**Check if features are enabled:**
```
!settings
```

**Enable them:**
```
!autoview on
!autoreact on
```

### **View once not saving?**

1. Make sure you react with 👀 emoji (default)
2. Check your personal DM with bot
3. Bot sends permanent copy there
4. Emoji can be changed in config.js

### **Deleted messages not captured?**

**Enable anti-delete:**
```
!antidelete on
```

**Check stored messages:**
```
!deleted
```

Only stores last 100 messages (configurable in config.js)

### **Bot disconnected from WhatsApp?**

**Reasons:**
- WhatsApp logged out
- Render service restarted
- Internet connection lost

**Solution:**
1. Visit your Render URL
2. Scan QR code again
3. Bot will reconnect

### **Commands not working?**

**Check:**
1. Bot is online (visit Render URL)
2. You have permission (owner/sudo)
3. Command syntax is correct
4. Bot mode (public/private)

**Test basic command:**
```
!ping
```
Should respond with "🏓 Pong!"

---

## 📊 **FEATURE COMPARISON**

| Feature | Owner | Sudo | Public Users |
|---------|-------|------|--------------|
| Basic Commands | ✅ | ✅ | ✅ (if public) |
| Settings | ✅ | ❌ | ❌ |
| Mode Toggle | ✅ | ❌ | ❌ |
| Sudo Management | ✅ | ❌ | ❌ |
| View Deleted | ✅ | ❌ | ❌ |
| Auto Features | ✅ | ❌ | ❌ |
| View Once Save | ✅ | ✅ | ✅ (if public) |
| AI Chatbot | ✅ | ✅ | ✅ (if enabled) |

---

## 🔐 **SECURITY TIPS**

1. **Keep owner number secret** - Don't share publicly
2. **Use private mode** - More secure
3. **Trust sudo users** - Only add friends you trust
4. **Change default emoji** - Make it unique
5. **Monitor deleted messages** - Check regularly
6. **Keep bot updated** - Pull latest changes

---

## 🚀 **ADVANCED TIPS**

### **Customize Auto React Emoji**

Edit `config.js`:
```javascript
autoReactEmoji: '🔥', // Use fire instead of heart
```

### **Change View Once Emoji**

Edit `config.js`:
```javascript
viewOnceEmoji: '💾', // Use save icon
```

### **Add Multiple Sudo Users**

Edit `config.js`:
```javascript
sudo: [
  '1234567890',
  '9876543210',
  '5555555555',
],
```

### **Increase Deleted Message Storage**

Edit `config.js`:
```javascript
settings: {
  maxDeletedMessages: 200, // Store last 200 instead of 100
}
```

---

## 📝 **CHANGELOG**

### v4.0.0 (Current)
- ✅ Auto view status
- ✅ Auto react to status
- ✅ Anti-delete messages & status
- ✅ View once message saver
- ✅ AI chatbot integration
- ✅ Fake typing & recording
- ✅ Owner & sudo system
- ✅ Private/public modes
- ✅ Complete settings menu
- ✅ 300+ commands

---

## 💬 **FAQ**

**Q: Does this bot ban my WhatsApp?**  
A: Uses unofficial API, so there's always a risk. Use at your own risk!

**Q: Can I use this on multiple phones?**  
A: Only one phone can be linked at a time.

**Q: Will auto-features drain battery?**  
A: No, bot runs on server, not your phone!

**Q: Can I add more commands?**  
A: Yes! Edit `index.js` and add your commands.

**Q: Is this free?**  
A: Yes! Render offers free tier. Premium for better uptime.

**Q: Do I need coding knowledge?**  
A: No! Just follow the setup guide.

**Q: Can I use this commercially?**  
A: MIT License - free for personal and commercial use!

**Q: How do I update the bot?**  
A: Pull latest changes from GitHub and redeploy.

---

## 📞 **SUPPORT**

Having issues? 

1. **Check this README** - Most answers are here
2. **Review Render logs** - See error messages
3. **Verify config.js** - Owner number correct?
4. **Test basic commands** - Start with `!ping`

---

## 🤝 **CONTRIBUTING**

Want to add features? Pull requests welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📜 **LICENSE**

MIT License

Copyright (c) 2026 Casper2 Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

---

## 🙏 **CREDITS**

- Built with [Baileys](https://github.com/WhiskeySockets/Baileys)
- Inspired by Cypher X bot style
- Created for the WhatsApp Bot community

---

## ⭐ **STAR THIS REPO**

If you find this bot useful, please give it a star! ⭐

---

## 🎯 **QUICK START SUMMARY**

1. ✅ Edit `config.js` - Change owner number
2. ✅ Upload 3 files to GitHub
3. ✅ Deploy to Render
4. ✅ Scan QR code
5. ✅ Send `!menu` to start!

---

**MADE WITH ❤️ FOR THE WHATSAPP BOT COMMUNITY**

**Enjoy your Casper2 Premium Bot! 🤖**

---

**Last Updated:** February 2026  
**Version:** 4.0.0  
**Status:** Active Development
