/* TODO: Develop a frontend for the application. 
Two input fields, and two input fields. 
Left hand side, text input, with a div under it, to show the coded string.

Right hand side, text input, with a div under it, to show the text.

*/


'use strict';

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "", "", "","", "", "", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'decode' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING encodedString as parameter.
 */


    
//Function to convert letter info ascii code
function converToAsc(s){
    
    let ascCode = 65;
    let converted = "";

    for (let index in s){
        
        for (let letter in alphabet ) {
            if (s[index] == alphabet[letter]){
                converted += ascCode + parseInt(letter);
            }
            
        }
    }

    return converted;
}


// Function to invert the string. 
function invertString(s){
    
    var pos = s.length;
    var n = 1;
    var ordStr = "";
    for (let index = 0; index < pos; index++){
       ordStr += s[pos-n];
       n++
    }
    return(ordStr);
}

//Function to convert from ascii code into letters.
function decrypt(letter){
     
    
    let phrase = "";
    let ascCode = parseInt(letter) - 65;
    
    phrase = alphabet[ascCode];
         
    return phrase;
}


//Function which is called to encrypt the string
function encode(unencodedString) {
   
    let s = converToAsc(unencodedString); 
    s = invertString(s);

    return s;

}


//Function that is called by the main function, in order to decode the string. 
function decode(encodedString) {
   
   let s = invertString(encodedString);
   let n = 1;
   let letter = "";
   
   for (let i = 0; i < s.length; i++){
       
       if (s[i] >= 6){
           let codedLetter = (s[i] + s[i+1]);
          
           letter += decrypt(codedLetter);
           
           i++;
           n++;
       }
       else if (s[i] == 1){
           let codedLetter = (s[i] + s[i+1] + s[i+2]);
           letter += decrypt(codedLetter);
           
           i += 2;
           n += 2;
       }
       else if (s[i] == 3 && s[n] == 2){
           letter += " ";
           i++;
           n++;
       };
   
       n++;
   }
   
   return letter;   
}

//The input must be a string.
function main(entrada) {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const encodedString = entrada;/* readLine(); */

    const result = decode(encodedString);

   /*  ws.write(result + '\n');

    ws.end(); */

    console.log(result);
}
