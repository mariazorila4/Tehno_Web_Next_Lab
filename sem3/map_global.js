//exercice
const sampleArray=[1, 2, 3, 4, 5]

const reduce=(array, transformation, initialValue)=>{
    let prev=initialValue;
    for(let i=0;i<array.length; i++){
        const curent=array[i];

        if(i in array){
            prev=transformation(prev, curent, i, array);
        }
    }
    return prev;

}

console.log(reduce(sampleArray, (prev, curent)=>prev+curent, 0))

//example from video
// const sampleArray=[1, 2, 3, 4, 5]

// const map=(array, transformation)=>{
//     const result=[]
//     for(const element of array){
//         result.push(transformation(element))
//     }
//     return result
// }
// console.log(map(sampleArray, (x)=>x*2))