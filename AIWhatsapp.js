const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function answerMessage(msg) {

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Responde a mi novia: " + msg,
        max_tokens: 4000
    });

    return completion.data.choices[0].text;
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    // console.log('Client is ready!');
    console.log('Inteligencia Artificial para WhatsApp Activada');
});


client.on('message', async message => {
    // console.log(message.from);
    // console.log(message.body);
    if (message.from === "50251831144@c.us") {
        console.log("Mensaje de mi novia:");
        console.log(message.body);
        const mensaje = await answerMessage(message.body);
        // client.sendMessage(message.from, mensaje);
        console.log("RESPUESTA GENERADA POR INTELIGENCIA ARTIFICIAL:");
        console.log(mensaje);
    }
});


client.initialize();
