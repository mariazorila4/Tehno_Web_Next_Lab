function returnArray(listNumbers){
    let newArray = [];
    for(let i=0; i<listNumbers.length; i++){
        newArray.push(listNumbers[i]);
    }
    return newArray;
}

console.log(returnArray());

//example from video
// function occurences(text, character){
//     let count = 0;
//     for(var i=0; i<text.length; i++){
//         if(text.charAt(i)===character){
//             count++;
//         }
//     }
//     return count;
// }

// function occurences(text, character){
//     return text.split(character).length - 1;
// }
   
// let occurences=(text, character)=>text.split(character).length - 1;

//  console.log(occurences("maria", "a"));
//  console.log(occurences("hello web", "e"));
//  console.log(occurences("pineapple", "p"));