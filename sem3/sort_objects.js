//exercice
const sortByKey=(array, key)=>{
    const copyArray=[...array];

    copyArray.sort((x,y)=>{
        const element1=x[key];
        const element2=y[key];
    

        if(typeof element1==='string' && typeof element2==='string'){
            const str1=element1.toLowerCase();
            const str2=element2.toLowerCase();

            if(str1<str2){
                return -1;
            }
            if(str1>str2){
                return 1;
            }
            return 0;
        }

        if(element1<element2){
            return -1;
        }
        if(element1>element2){
            return 1;
        }
        return 0;

    });

    return copyArray;
}

const users=[
    { name: 'Maria', age: 21, city: 'Bolintin-Vale' },
    { name: 'Bogdan', age: 22, city: 'Slobozia' },
    { name: 'Alex', age: 21, city: 'Bucharest' },
    { name: 'Gabi', age: 21, city: 'Slobozia' }
];

console.log(sortByKey(users, 'age'));
console.log(sortByKey(users, 'city'))

//optional exercice
const sampleArray=[1, 2, 3, 4, 5]

const reduce=(array, transformation, initialValue)=>{
    let prev=initialValue;
    const len=array.length;
    for(let i=0;i<array.length; i++){
        const curent=array[i];

        if(i in array){
            prev=transformation(prev, curent, i, array, len);
        }
    }
    return prev;

}

console.log(reduce(sampleArray, (prev, curent, index, arr, lenArray)=>prev+curent/lenArray, 0))

//example from video
// const getFilteredObjects=(array, object)=>{
//     return array.filter((element)=>{
//         let result=false

//         Object.keys(object).forEach(key=>{
//             if(!element[key] || element[key]!==object[key]){
//                 result=true
//             }
//         })
//         return result
//     })
// }

// const laptos=[
//     {
//         brand: 'HP',
//         processor: 'i5',
//         ram: 8
//     },
//     {
//         brand: 'Lenovo',
//         processor: 'i5',
//         ram: 16
//     },
//     {
//         brand: 'Acer',
//         processor: 'i5',
//         ram: 8
//     },
//     {
//         brand: 'Asus',
//         processor: 'i7',
//         ram: 8
//     },
// ]

// const result=getFilteredObjects(laptos, {processor:'i5', ram:8})
// console.log('result: ', result)