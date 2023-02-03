const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let conversation = '';
let countMessage = 0;

function pushConversation(txt){
    conversation += txt + ' \n';
    countMessage++;
}

async function answerMessage(msg) {

    pushConversation(msg);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: "Responde a mi amigo: " + msg,
        prompt: countMessage === 1 ? `responde a mi amigo: ${conversation}` : conversation,
        max_tokens: 100
    });
    pushConversation(completion.data.choices[0].text);
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
    // client.sendMessage("50251268484@c.us", "Prueba de mensaje de un bot");

});


client.on('message', async message => {
    // console.log(message.from);
    // console.log(message.body);

    // if (message.from === "50251831144@c.us") {
    //     console.log("Mensaje de mi novia:");
    //     console.log(message.body);
    //     const mensaje = await answerMessage(message.body);
    //     // client.sendMessage(message.from, mensaje);
    //     console.log("RESPUESTA GENERADA POR INTELIGENCIA ARTIFICIAL:");
    //     console.log(mensaje);
    // }

    // if (message.from === "50251268484@c.us") {
    //     console.log("Mensaje de robin:");
    //     console.log(message.body);
    //     const mensaje = await answerMessage(message.body);
    //     client.sendMessage(message.from, mensaje);
    //     console.log("RESPUESTA GENERADA POR INTELIGENCIA ARTIFICIAL:");
    //     console.log(mensaje);
    // }

    if (message.from === "50242345578@c.us") {
        console.log("Mensaje de oscar:");
        console.log(message.body);
        const mensaje = await answerMessage(message.body);
        client.sendMessage(message.from, mensaje);
        console.log("RESPUESTA GENERADA POR INTELIGENCIA ARTIFICIAL:");
        console.log(mensaje);
    }
});


client.initialize();
