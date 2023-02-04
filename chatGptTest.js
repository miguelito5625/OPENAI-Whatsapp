const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingGirlFriend = `
vas ha chatear con mi novia tomando en cuenta lo siguiente: poner amor en cada respuesta, 
usar maximo 20 palabras,
reponder educadamente,
la conversacion comienza ahora: 
`;

console.log(preTrainingGirlFriend);

 pushConversation(preTrainingGirlFriend);

function pushConversation(txt){
    conversation += txt + ' \n';
}

function clearTokens(){
    conversation = preTrainingGirlFriend + ' \n' + conversation.substring(preTrainingGirlFriend.length+500);
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
        if (conversation.length > 3000) {
            console.log('limpiando tokens');
            clearTokens();
            console.log("Tokens: " + conversation.length);
        }
        askQuestion();
    });
}

askQuestion();



