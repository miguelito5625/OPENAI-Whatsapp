
let conversation = 'linea 1 \n'+
'linea 2 \n'+
'linea 3 \n'+
'linea 4 \n';


function removeLines(text, linesToRemove) {
    const lines = text.split("\n");
    return [lines[0]].concat(lines.slice(linesToRemove + 1)).join("\n");
  }

  console.log(removeLines(conversation, 2));

