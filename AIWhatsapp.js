const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Config logs
const LOG_LEVELS = ['error', 'warning', 'info', 'debug'];

const log = (level, message) => {
  if (LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf('info')) {
    console.log(`\n [${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`);
  }
};

// Example usage:
// log('error', 'An error occurred');
// log('warning', 'A warning was issued');
// log('info', 'Important information');
// log('debug', 'Debug information');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let girlFriendConversation = '';

let preTrainingGirlFriend = `
vas ha chatear con mis clientes tomando en cuenta lo siguiente: somo una empresa que vende piedras en forma de gato, 
horarios 24/7,
descuestos dias festivos,
servicio a domicilio,
usar maximo 50 palabras,
reponder educadamente,
la conversacion comienza ahora: 
`;

function pushConversation(txt) {
    girlFriendConversation += txt + ' \n';
}

function clearTokens() {
    conversation = preTrainingGirlFriend + ' \n' + conversation.substring(preTrainingGirlFriend.length + 500);
}

pushConversation(preTrainingGirlFriend);


async function answerMessageGirlFriend(phone, msg) {
    pushConversation(msg);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: girlFriendConversation,
        max_tokens: 300
    });
    pushConversation(completion.data.choices[0].text);
    // return completion.data.choices[0].text;
    const answer = completion.data.choices[0].text;
    client.sendMessage(phone, answer);
    log('info', `Message of ${phone}: ${msg} || AnswerAI: ${answer} || Tokens: ${girlFriendConversation.length}`);
    if (girlFriendConversation.length > 3700) {
        clearTokens();
        log('warning', `Cleaning tokens: ${girlFriendConversation.length}`);
    }
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Whatsapp AI is ready...');
});


client.on('message', message => {
    if (message.from === "50251268484@c.us") {
        answerMessageGirlFriend(message.from, message.body);
    }
});


client.initialize();
