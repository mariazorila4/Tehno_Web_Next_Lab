//exercitiu
Number.prototype.times=function(callback){
    if(typeof callback!=='function'){
        throw new TypeError(`Se astepta functie, dar s-a primit ${typeof callback}`)
    }

    const n=Math.trunc(this.valueOf());

    for(let i=0;i<n;i++){
        callback(i);
    }
}

const sayHello = (index) => {
    console.log(`Executia numarul ${index + 1}: Salut!`);
}

console.log("Testam (3).times(...):");
(3).times(sayHello);

//exemplu din video
// String.prototype.capitalizedWords = function () {
//     return this.replace(/\b[a-z]/g, match => match.toUpperCase())
// }

// console.log("these words will be calipalized".capitalizedWords())