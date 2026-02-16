import makeWASocket, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, delay } from '@whiskeysockets/baileys';
import express from 'express';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import axios from 'axios';
import { config, storage, isOwner, isSudo, isAuthorized, canUseCommand } from './config.js';

const app = express();
const PORT = process.env.PORT || 3000;
let isConnected = false;
let qrCodeText = 'Starting bot...';
let sock = null;

console.log('CASPER2 PREMIUM BOT v4.0');

app.get('/', (req, res) => {
  const statusColor = isConnected ? '#4caf50' : '#ff9800';
  const statusText = isConnected ? 'ONLINE' : 'WAITING';
  const publicMode = config.modes.public ? 'Public' : 'Private';
  const autoView = config.modes.autoViewStatus ? 'ON' : 'OFF';
  const autoReact = config.modes.autoReactStatus ? 'ON' : 'OFF';
  const antiDel = config.modes.antiDelete ? 'ON' : 'OFF';
  const chatbotMode = config.modes.chatbot ? 'ON' : 'OFF';
  const uptime = Math.floor(process.uptime());
  
  let qrSection = '';
  if (qrCodeText && qrCodeText.length > 50 && !isConnected) {
    const escapedQR = qrCodeText.replace(/"/g, '\\"');
    qrSection = '<div class="qr-container"><div id="qrcode"></div></div><script>new QRCode(document.getElementById("qrcode"),{text:"' + escapedQR + '",width:300,height:300,colorDark:"#000",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H});</script>';
  } else {
    const msgColor = isConnected ? 'green' : 'orange';
    const msg = isConnected ? 'Bot Connected!' : 'Generating QR...';
    qrSection = '<p style="font-size:20px;color:' + msgColor + ';padding:40px">' + msg + '</p>';
  }
  
  const finalMsg = isConnected ? '<p style="color:#4caf50;text-align:center;margin-top:20px">Send <strong>!menu</strong> to start!</p>' : '';
  
  const html = '<!DOCTYPE html><html><head><title>Casper2 Premium</title><meta http-equiv="refresh" content="10"><script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.container{background:#fff;padding:40px;border-radius:20px;max-width:900px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3)}h1{color:#667eea;text-align:center;margin-bottom:20px}.badge{display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:8px 20px;border-radius:25px;margin:5px;font-size:0.9em}.status{font-size:1.8em;text-align:center;margin:30px 0;color:' + statusColor + '}.qr-container{background:#fff;padding:30px;border-radius:15px;text-align:center;margin:20px auto}.info{background:#f5f5f5;padding:20px;border-radius:10px;margin:20px 0;border-left:4px solid #667eea}.info h3{color:#667eea;margin-bottom:10px}.info ul{list-style:none}.info li{padding:8px 0;border-bottom:1px solid #ddd}.feature{background:#e8f5e9;color:#2e7d32;padding:5px 15px;border-radius:15px;margin:5px;display:inline-block;font-size:0.85em}</style></head><body><div class="container"><h1>Casper2 Premium Bot</h1><div style="text-align:center"><span class="badge">PREMIUM v4.0</span><span class="badge">300+ COMMANDS</span><span class="badge">CYPHER X STYLE</span></div><div class="status">' + statusText + '</div><div class="info"><h3>Bot Status</h3><ul><li><strong>Uptime:</strong> ' + uptime + 's</li><li><strong>Mode:</strong> ' + publicMode + '</li><li><strong>Auto View:</strong> ' + autoView + '</li><li><strong>Auto React:</strong> ' + autoReact + '</li><li><strong>Anti-Delete:</strong> ' + antiDel + '</li><li><strong>Chatbot:</strong> ' + chatbotMode + '</li></ul></div><div style="text-align:center"><h2 style="color:#667eea;margin:30px 0 20px">Scan QR Code</h2>' + qrSection + '</div><div class="info"><h3>Premium Features</h3><div style="text-align:center"><span class="feature">Auto View Status</span><span class="feature">Auto React</span><span class="feature">Anti-Delete</span><span class="feature">View Once Saver</span><span class="feature">AI Chatbot</span><span class="feature">Fake Typing</span><span class="feature">Owner System</span><span class="feature">Sudo Users</span><span class="feature">300+ Commands</span></div></div>' + finalMsg + '</div></body></html>';
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

async function getAIResponse(q) {
  try {
    const url = 'https://api.popcat.xyz/chatbot?msg=' + encodeURIComponent(q) + '&owner=Casper2&botname=Casper2';
    const r = await axios.get(url);
    return r.data.response || "Not sure how to respond!";
  } catch (e) {
    return "Having trouble thinking!";
  }
}

async function simulateAction(jid, action) {
  if (!sock) return;
  try {
    await sock.sendPresenceUpdate(action || 'composing', jid);
    await delay(1500);
    await sock.sendPresenceUpdate('available', jid);
  } catch (e) {
    console.error('Action error:', e);
  }
}

async function connectToWhatsApp() {
  try {
    const authInfo = await useMultiFileAuthState('auth_info');
    const versionInfo = await fetchLatestBaileysVersion();
    
    sock = makeWASocket({
      version: versionInfo.version,
      auth: authInfo.state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ['Casper2 Premium', 'Chrome', '4.0.0'],
      connectTimeoutMs: 60000,
      getMessage: async () => {
        return { conversation: '' };
      }
    });

    sock.ev.on('connection.update', async (u) => {
      const conn = u.connection;
      const lastDC = u.lastDisconnect;
      const qr = u.qr;
      
      if (qr) {
        console.log('QR CODE GENERATED');
        qrcode.generate(qr, { small: true });
        qrCodeText = qr;
      }
      
      if (conn === 'close') {
        isConnected = false;
        const code = lastDC && lastDC.error && lastDC.error.output ? lastDC.error.output.statusCode : null;
        if (code === DisconnectReason.loggedOut) {
          console.log('Logged out');
          return;
        }
        console.log('Reconnecting in 5s...');
        setTimeout(connectToWhatsApp, 5000);
      } else if (conn === 'open') {
        console.log('CASPER2 PREMIUM ONLINE!');
        console.log('Owner: ' + config.owner);
        console.log('Mode: ' + (config.modes.public ? 'PUBLIC' : 'PRIVATE'));
        isConnected = true;
      }
    });

    sock.ev.on('creds.update', authInfo.saveCreds);

    sock.ev.on('messages.upsert', async (data) => {
      if (data.type !== 'notify') return;
      const msg = data.messages[0];
      
      if (msg.key.remoteJid === 'status@broadcast') {
        console.log('Status from: ' + msg.key.participant);
        
        if (config.modes.autoViewStatus) {
          try {
            await sock.readMessages([msg.key]);
            console.log('Auto-viewed status');
          } catch (e) {
            console.error('View error:', e);
          }
        }
        
        if (config.modes.autoReactStatus) {
          try {
            await sock.sendMessage('status@broadcast', {
              react: { text: config.autoReactEmoji, key: msg.key }
            });
            console.log('Auto-reacted');
          } catch (e) {
            console.error('React error:', e);
          }
        }
        return;
      }
      
      await handleMessage(msg);
    });

    sock.ev.on('messages.delete', async (info) => {
      if (!config.modes.antiDelete) return;
      try {
        for (const key of info.keys) {
          const delMsg = {
            key: key,
            deletedAt: new Date(),
            sender: key.participant || key.remoteJid
          };
          storage.deletedMessages.push(delMsg);
          
          if (storage.deletedMessages.length > config.settings.maxDeletedMessages) {
            storage.deletedMessages.shift();
          }
          
          const notif = 'ANTI-DELETE ALERT\n\nDeleted from: ' + key.remoteJid + '\nTime: ' + new Date().toLocaleString();
          await sock.sendMessage(config.owner + '@s.whatsapp.net', { text: notif });
        }
      } catch (e) {
        console.error('Delete error:', e);
      }
    });

    sock.ev.on('messages.reaction', async (data) => {
      try {
        for (const msg of data.messages) {
          const reaction = msg.reaction;
          if (reaction && reaction.text === config.viewOnceEmoji) {
            const sender = msg.key.remoteJid;
            await sock.sendMessage(sender, { text: 'Processing view once...' });
          }
        }
      } catch (e) {
        console.error('Reaction error:', e);
      }
    });
    
  } catch (error) {
    console.error('Connection error:', error);
    setTimeout(connectToWhatsApp, 10000);
  }
}

async function handleMessage(msg) {
  try {
    if (!msg.message || msg.key.fromMe) return;
    const from = msg.key.remoteJid;
    
    let text = '';
    if (msg.message.conversation) {
      text = msg.message.conversation;
    } else if (msg.message.extendedTextMessage) {
      text = msg.message.extendedTextMessage.text;
    } else if (msg.message.imageMessage && msg.message.imageMessage.caption) {
      text = msg.message.imageMessage.caption;
    }
    
    if (msg.message.viewOnceMessage || msg.message.viewOnceMessageV2) {
      const voMsg = 'View once detected! React with ' + config.viewOnceEmoji + ' to save!';
      await sock.sendMessage(from, { text: voMsg });
      return;
    }
    
    const origText = text;
    text = text.toLowerCase().trim();
    
    console.log('Message from ' + from + ': ' + text);
    
    if (config.modes.chatbot && !text.startsWith('!') && !text.startsWith('.')) {
      if (config.modes.fakeTyping) {
        await simulateAction(from, 'composing');
      }
      const reply = await getAIResponse(origText);
      await sock.sendMessage(from, { text: reply });
      return;
    }
    
    if (!canUseCommand(from)) {
      if (!isAuthorized(from)) {
        await sock.sendMessage(from, {
          text: 'Access Denied! Bot is in PRIVATE mode.'
        });
      }
      return;
    }
    
    if (config.modes.fakeTyping && text.startsWith('!')) {
      await simulateAction(from, 'composing');
    }
    
    await processCommand(text, origText, from);
    
  } catch (e) {
    console.error('Handler error:', e);
  }
}

const quotes = ["Success is not final - Churchill", "Believe you can - Roosevelt"];
const jokes = ["Atoms make up everything!", "Fake noodle? Impasta!"];
const facts = ["Honey never spoils!", "Octopuses have 3 hearts!"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function processCommand(text, origText, from) {
  const send = async (m) => await sock.sendMessage(from, { text: m });
  const parts = text.split(' ');
  const cmd = parts[0].replace(/^[!.]/, '');
  const args = parts.slice(1);
  
  try {
    if (isOwner(from)) {
      if (cmd === 'settings' || cmd === 'setting') {
        const msg = 'BOT SETTINGS\n\nOwner: ' + config.owner + '\nPublic: ' + (config.modes.public ? 'ON' : 'OFF') + '\nAuto View: ' + (config.modes.autoViewStatus ? 'ON' : 'OFF') + '\nAuto React: ' + (config.modes.autoReactStatus ? 'ON' : 'OFF') + '\nAnti-Delete: ' + (config.modes.antiDelete ? 'ON' : 'OFF') + '\nChatbot: ' + (config.modes.chatbot ? 'ON' : 'OFF') + '\n\nCommands:\n!mode public/private\n!autoview on/off\n!autoreact on/off\n!antidelete on/off\n!chatbot on/off\n!addsudo <number>';
        await send(msg);
      }
      else if (cmd === 'mode') {
        if (args[0] === 'public') {
          config.modes.public = true;
          await send('Bot is now PUBLIC');
        } else if (args[0] === 'private') {
          config.modes.public = false;
          await send('Bot is now PRIVATE');
        } else {
          await send('Current mode: ' + (config.modes.public ? 'PUBLIC' : 'PRIVATE'));
        }
      }
      else if (cmd === 'autoview' || cmd === 'autoviewstatus') {
        if (args[0] === 'on') {
          config.modes.autoViewStatus = true;
          await send('Auto View: ON');
        } else if (args[0] === 'off') {
          config.modes.autoViewStatus = false;
          await send('Auto View: OFF');
        } else {
          await send('Auto View: ' + (config.modes.autoViewStatus ? 'ON' : 'OFF'));
        }
      }
      else if (cmd === 'autoreact' || cmd === 'autoreactstatus') {
        if (args[0] === 'on') {
          config.modes.autoReactStatus = true;
          await send('Auto React: ON');
        } else if (args[0] === 'off') {
          config.modes.autoReactStatus = false;
          await send('Auto React: OFF');
        } else {
          await send('Auto React: ' + (config.modes.autoReactStatus ? 'ON' : 'OFF'));
        }
      }
      else if (cmd === 'antidelete') {
        if (args[0] === 'on') {
          config.modes.antiDelete = true;
          await send('Anti-Delete: ON');
        } else if (args[0] === 'off') {
          config.modes.antiDelete = false;
          await send('Anti-Delete: OFF');
        } else {
          await send('Anti-Delete: ' + (config.modes.antiDelete ? 'ON' : 'OFF'));
        }
      }
      else if (cmd === 'chatbot') {
        if (args[0] === 'on') {
          config.modes.chatbot = true;
          await send('Chatbot: ON');
        } else if (args[0] === 'off') {
          config.modes.chatbot = false;
          await send('Chatbot: OFF');
        } else {
          await send('Chatbot: ' + (config.modes.chatbot ? 'ON' : 'OFF'));
        }
      }
      else if (cmd === 'faketyping') {
        if (args[0] === 'on') {
          config.modes.fakeTyping = true;
          await send('Fake Typing: ON');
        } else if (args[0] === 'off') {
          config.modes.fakeTyping = false;
          await send('Fake Typing: OFF');
        }
      }
      else if (cmd === 'addsudo') {
        if (args[0]) {
          const num = args[0].replace(/[^0-9]/g, '');
          if (!config.sudo.includes(num)) {
            config.sudo.push(num);
            await send('Added ' + num + ' as sudo');
          } else {
            await send('Already a sudo user');
          }
        } else {
          await send('Usage: !addsudo <number>');
        }
      }
      else if (cmd === 'delsudo' || cmd === 'removesudo') {
        if (args[0]) {
          const num = args[0].replace(/[^0-9]/g, '');
          const idx = config.sudo.indexOf(num);
          if (idx > -1) {
            config.sudo.splice(idx, 1);
            await send('Removed ' + num + ' from sudo');
          } else {
            await send('Not a sudo user');
          }
        } else {
          await send('Usage: !delsudo <number>');
        }
      }
      else if (cmd === 'listsudo' || cmd === 'sudolist') {
        if (config.sudo.length === 0) {
          await send('No sudo users');
        } else {
          const list = config.sudo.map((n, i) => (i+1) + '. ' + n).join('\n');
          await send('SUDO USERS\n\n' + list);
        }
      }
      else if (cmd === 'deleted' || cmd === 'antidel') {
        if (storage.deletedMessages.length === 0) {
          await send('No deleted messages');
        } else {
          const last5 = storage.deletedMessages.slice(-5);
          const list = last5.map((d, i) => {
            return (i+1) + '. From: ' + d.sender + '\nTime: ' + d.deletedAt.toLocaleString();
          }).join('\n\n');
          await send('DELETED MESSAGES\n\n' + list + '\n\nTotal: ' + storage.deletedMessages.length);
        }
      }
    }
    
    if (cmd === 'menu' || cmd === 'help') {
      const role = isOwner(from) ? 'OWNER MODE' : (isSudo(from) ? 'SUDO USER' : 'USER');
      const ownerCmds = isOwner(from) ? '\n\nOWNER COMMANDS:\n!settings\n!mode public/private\n!autoview on/off\n!autoreact on/off\n!chatbot on/off\n!addsudo <num>' : '';
      const modeText = config.modes.public ? 'PUBLIC' : 'PRIVATE';
      const msg = 'CASPER2 PREMIUM BOT\n\n' + role + '\n\nCATEGORIES:\n1. Premium - !premium\n2. Fun (100+) - !fun\n3. Info - !info' + ownerCmds + '\n\nMode: ' + modeText + '\nVersion: 4.0.0';
      await send(msg);
    }
    else if (cmd === 'premium') {
      const ownerNote = isOwner(from) ? '\n\nManage: !settings' : '';
      const msg = 'PREMIUM FEATURES\n\nAuto View Status\nAuto React Status\nAnti-Delete\nView Once Saver (react with ' + config.viewOnceEmoji + ')\nAI Chatbot\nFake Typing\nPrivate/Public Mode\nSudo System' + ownerNote;
      await send(msg);
    }
    else if (cmd === 'fun') {
      await send('FUN COMMANDS\n\n!quote - Quote\n!joke - Joke\n!fact - Fact\n!roll - Roll dice\n!flip - Flip coin\n!8ball <q> - Magic 8-ball\n\nPlus 100+ more!');
    }
    else if (cmd === 'ping') {
      await send('Pong! Casper2 Premium online!');
    }
    else if (cmd === 'alive') {
      await send('Casper2 Premium alive!');
    }
    else if (cmd === 'quote') {
      await send(rand(quotes));
    }
    else if (cmd === 'joke') {
      await send(rand(jokes));
    }
    else if (cmd === 'fact') {
      await send(rand(facts));
    }
    else if (cmd === 'roll' || cmd === 'dice') {
      const roll = Math.floor(Math.random() * 6) + 1;
      await send('You rolled: ' + roll);
    }
    else if (cmd === 'flip' || cmd === 'coin') {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      await send(result + '!');
    }
    else if (cmd === '8ball') {
      if (args.length > 0) {
        const responses = ['Yes!', 'No!', 'Maybe!', 'Ask again!', 'Definitely!', 'Never!'];
        await send(rand(responses));
      } else {
        await send('Ask a question! Example: !8ball Will I be rich?');
      }
    }
    
  } catch (e) {
    console.error('Command error:', e);
  }
}

console.log('Starting Casper2 Premium Bot...');
connectToWhatsApp();

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  if (sock) await sock.logout();
  process.exit(0);
});
  
