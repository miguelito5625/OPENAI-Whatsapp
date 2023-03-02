const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingWords = 
`Respondele a mis clientes tomando en cuenta lo siguiente:
somos una tienda con multiples productos,
atendemos 24/7,
preguntar si lo quiere agregar al carrito, llevar el control del carrito,
dar el total cada vez que agregue algo al carrito
preguntar si desea algo mas,
si ya no desea nada mas responder: orden realizada,
en la siguinete linea crear un json con los datos del carrito sin ningun otro mensaje solo el json, ejemplo: 
{
    "productos": [
        {
            "nombre": leche,
            "precio": 20.00
        }
        ...
    }
    y asi con todos los productos del carrito,
tenemos los siguientes productos:
1. leche a Q20.00
2. Cereal a Q15.00
3. harina a Q4.00 la libra
la conversacion comienza ahora:
`;

// console.log(preTrainingWords);

 pushConversation(preTrainingWords);

function pushConversation(txt){
    conversation += txt + '\n';
}

function clearTokens(){
    conversation = preTrainingWords + ' \n' + conversation.substring(preTrainingWords.length+500);
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



