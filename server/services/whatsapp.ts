import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import QRCode from 'qrcode';

let isReady = false;
let latestQrPng: Buffer | null = null;

export const getLatestQrPng = (): Buffer | null => latestQrPng;
// setQrCallback is kept for API compatibility (not used, but imported in app.ts)
export const setQrCallback = (_cb: Function) => {};


const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  },
});

client.on('qr', async (qr) => {
  console.log('\n===================================');
  console.log('  ESCANEA EL QR CON TU WHATSAPP  ');
  console.log('  Abre: http://localhost:3001/qr   ');
  console.log('===================================\n');
  qrcode.generate(qr, { small: true });
  try {
    latestQrPng = await QRCode.toBuffer(qr, { width: 400 });
    console.log('\n📷 QR listo en: http://localhost:3001/qr\n');
  } catch (e) {}
});

client.on('ready', () => {
  isReady = true;
  latestQrPng = null; // clear QR once connected
  console.log('\n✅ WhatsApp conectado correctamente.\n');
});

client.on('authenticated', () => {
  console.log('🔐 WhatsApp autenticado — guardando sesión...');
});

client.on('auth_failure', (msg) => {
  console.error('❌ WhatsApp auth failure:', msg);
  isReady = false;
});

client.on('disconnected', (reason) => {
  console.warn('⚠️  WhatsApp desconectado:', reason);
  isReady = false;
  // Try to reconnect
  setTimeout(() => {
    console.log('🔄 Intentando reconectar WhatsApp...');
    client.initialize().catch(err => console.error('Error al reconectar:', err));
  }, 5000);
});

// Start connection — don't crash if it fails
client.initialize().catch(err => {
  console.error('⚠️  WhatsApp no pudo inicializar:', err.message);
  console.log('   La API seguirá funcionando sin WhatsApp.\n');
});

/**
 * Sends a WhatsApp message to a phone number.
 */
export const sendWhatsApp = async (phone: string, message: string): Promise<void> => {
  if (!isReady) {
    console.warn('⚠️  WhatsApp no está listo. Mensaje no enviado a:', phone);
    return;
  }
  try {
    const digits = phone.replace(/\D/g, '');
    const chatId = digits.length >= 11 ? `${digits}@c.us` : `521${digits}@c.us`;
    await client.sendMessage(chatId, message);
    console.log(`✅ WhatsApp enviado a ${chatId}`);
  } catch (err) {
    console.error('❌ Error enviando WhatsApp:', err);
  }
};

export default client;
