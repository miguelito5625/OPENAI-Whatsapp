const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const destination = "51268484";



const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready!');
    // const number = `+502${destination}`;
    // const text = "Prueba de chatbot";
    // const chatId = number.substring(1) + "@c.us";
    // client.sendMessage(chatId, text);
});


client.on('message', async message => {
    if (message.from === "50251831144@c.us") {
        console.log("Mensaje de mi amorcito");
    }
    console.log(message.from);
    console.log(message.body);
});


client.initialize();
