//exercitiu
function powerGen(){
    const cache=new Map();

    const power=(base, exp)=>{
        if(exp<0||!Number.isInteger(exp)){
            return NaN;
        }

        const key=`${base}^${exp}`;

        if(cache.has(key)){
            console.log(`found [${base}^${exp}] din cache`);
            return cache.get(key);
        }

        if(exp===0){
            console.log(`valoarea calculata pt [${base}^${exp}]`);
            const result=1;
            cache.set(key, result);
            return result;
        }

        console.log(`calculeaza [${base}^${exp}...]`);
        const result=base*power(base, exp-1);
        cache.set(result, key);
        return result;
    }

    return power;
}

const power=powerGen();
console.log("Calculam 3^4");
console.log("Rezultat final 3^4:", power(3,4));

console.log("\nCalculam 3^2");
console.log('Rezultat final:', power(3, 2));

console.log("\nCalculăm 5^3");
console.log('Rezultat final:', power(5, 3));

console.log("\nCalculăm 5^4");
console.log('Rezultat final:', power(5, 4));

//exemplu video
// function fibGen(){
//     const cache=[1,1]
//     const fib=(index)=>{
//         if(index<cache.length){
//             console.log('found'+index)
//             return cache[index]
//         }else{
//             console.log('calculated '+index)
//             cache[index]=fib(index-1)+fib(index-2)
//             return cache[index]
//         }
//     }
//     return fib
// }

// const fib=fibGen()
// console.log(fib(1))
// console.log(fib(5))
// console.log(fib(3))