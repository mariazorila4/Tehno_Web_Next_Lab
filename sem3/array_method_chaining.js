//exercice
const sampleDictionary=['este'];
const sampleText=`javascript este minunat`

const checkCensor=(text, dictionary)=>{
    const dictionarySet=new Set(dictionary.map(word=>word.toLowerCase()));

    const censorMask=(word)=>{
        if(word.length<2){
            return word;
        }
        return word[0]+'*'.repeat(word.length-2)+word[word.length-1];
    }

    const candidate=text.split(" ").map(word=>{
        if(word===0) return word;
        
        if(dictionarySet.has(word.toLowerCase())){
            return censorMask(word);
        }

        return word;
    }).join(' ');

    return candidate;
}

console.log(checkCensor(sampleText, sampleDictionary));

//example from video
// const sampleDictionary=['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']

// const sampleText=`
//     best
//     read
//     on
//     windy
//     nights
// `

// const checkAcrostic=(text, dictionary)=>{
//     const candidate=text.split('\n').filter(e=>e).map(e=>e.trim()).map(e=>e[0]).join('')

//     return dictionary.indexOf(candidate)!==-1
// }

// console.log(checkAcrostic(sampleText, sampleDictionary))