//exercice
const currentYear=new Date().getFullYear();
const birthYears=[1966, 1974, 2004, 2007, 2010, 2015];
const ages=birthYears.map(year=>currentYear-year);
const adultAge=ages.filter(age=>age>=18);

console.log("Birth years array:", birthYears);
console.log("Calculated ages:", ages);
console.log("Ages over 18:", adultAge);

//example from video
// const words=["fox", "wolf", "snake", "crocodile", "lion", "cat", "crocodile", "horse"]

// const forbiddenWord="crocodile"
// const minLength=4

// const filterWords=(wors, forbiddenWord, minLength)=>{
//     const result=words.filter((word)=>{
//         if(word!==forbiddenWord && word.length>=minLength){
//             return true
//         }
//         return false;
//     })
//     return result
// }
//console.log(filterWords(words, forbiddenWord, minLength))

//another method
// const filterWords=(words, forbiddenWord, minLength)=>
//     words.filter((word)=>word!==forbiddenWord && word.length>=minLength);

// console.log(filterWords(words, forbiddenWord, minLength))


