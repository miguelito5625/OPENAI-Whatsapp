const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingGirlFriend = 'vas ha chatear con mi novia tomando en cuenta lo siguiente: esta enojada conmigo porque no respondo rapido, quiere ir al parque y '+ 
 'quiere comer pizza, responde con mensajes cortos no mas de 20 palabras, agrega la palabra amor en cada respuesta, la conversacion comienza a partir del sigiguiente mensaje:';

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
            max_tokens: 100
        });
        // console.log(completion.data.choices[0].text);
        pushConversation(completion.data.choices[0].text);
        console.log("Conversacion:");
        console.log(conversation);
        console.log("Tokens: " + conversation.length);
        if (conversation.length > 3000) {
            console.log('limpiando tokens');
            clearTokens();
        }
        console.log("Tokens: " + conversation.length);
        askQuestion();
    });
}

askQuestion();



