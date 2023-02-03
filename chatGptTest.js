const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

function pushConversation(txt){
    conversation += txt + ' \n';
}

const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question("Ingresa tu pregunta: ", async (answer) => {
        pushConversation(answer);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: conversation,
            max_tokens: 100
        });
        console.log(completion.data.choices[0].text);
        console.log(completion.data);
        pushConversation(completion.data.choices[0].text);
        askQuestion();
    });
}

askQuestion();



