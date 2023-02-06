const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingGirlFriend = 
`respondele a mi novia de manera educada y siempre dile amor o mi vida en cada respuesta, no le preguntes ¿Cómo puedo ayudarte hoy? nada parecido: `;

// console.log(preTrainingGirlFriend);

 pushConversation(preTrainingGirlFriend);

function pushConversation(txt){
    conversation += txt + '\n';
}

function clearTokens(){
    conversation = preTrainingGirlFriend + ' \n' + conversation.substring(preTrainingGirlFriend.length+500);
}

function removeLines(text, linesToRemove) {
    const lines = text.split("\n");
    return [lines[0]].concat(lines.slice(linesToRemove + 1)).join("\n");
  }

console.log(conversation);

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
            max_tokens: 300
        });
        // console.log(completion.data.choices[0].text);
        pushConversation(completion.data.choices[0].text);
        console.log("Conversacion:");
        console.log(conversation);
        console.log("Tokens: " + conversation.length);
        if (conversation.length > 3500) {
            console.log('limpiando tokens');
            // clearTokens();
            conversation = removeLines(conversation,2);
            console.log("Tokens: " + conversation.length);
        }
        askQuestion();
    });
}

askQuestion();



