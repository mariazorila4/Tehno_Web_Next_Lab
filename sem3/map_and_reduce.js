//exercice
function sumDivisibleNumbers(numbers, divisor){
    if(divisor===0){
        console.log("Divisor can't be 0");
    }

    const sum=numbers.reduce((prev, curent)=>{
        if(curent%divisor===0){
            return prev+curent;
        }else{
            return prev;
        }
    }, 0);

    return sum;
}

const numbers=[10, 3, 21, 5, 30, 7, 6, 15]
const divisor=3

console.log(sumDivisibleNumbers(numbers, divisor))

//example from video
// const getTotalArea=(squareDimensions)=>{
//     return squareDimensions.map((side)=>{
//         return side*side
//     }).reduce((prev, curent)=>{
//         return prev+curent
//     }, 0)
// }

// const squareDimensions=[3,5,12,3,5,3]

// const result=getTotalArea(squareDimensions)
// console.log("result: ", result)