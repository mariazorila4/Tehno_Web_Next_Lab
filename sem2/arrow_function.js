let sayHello=function(words){
    let enunt="";
    for(let i=0;i<words.length;i++){
        enunt+=`${words[i]}`+" ";
    }
   return enunt;
};

console.log(sayHello(["First", "arrow", "function", "created"]))

//example from video
//let sayHello=function(name){
//    return `Hello, ${name}!`;
//}

//console.log(sayHello(process.argv[2]));