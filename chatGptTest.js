const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question("Ingresa tu pregunta: ", async (answer) => {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: answer,
            max_tokens: 4000
        });
        console.log("logitud: ", completion.data.choices[0].text.length);
        console.log(completion.data.choices[0].text);
        askQuestion();
    });
}

askQuestion();



