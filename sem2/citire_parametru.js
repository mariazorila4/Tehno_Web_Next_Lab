const fibonacci=(n)=>{
    let num1=1;
    let num2=0;
    let newNum=0;
    for(var i=0; i<n; i++){
        newNum=num1+num2;
        num2=num1;
        num1=newNum;
    }
    return newNum;
}

if(process.argv.length<3){
    console.log("not enough params");
}else{
    console.log(fibonacci(parseInt(process.argv[2])));
}

//exemple from video
// const CheckPrime=(n)=>{
//     for(let i=2; i<=Math.sqrt(n); i++){
//         if(!(n%i)){
//             return false;
//         }
//     }
//     return true;
// }

// if(process.argv.length<=2){
//     console.log("not enough params");}
//     else
//     {
//       console.log(CheckPrime(parseInt(process.argv[2])));
//     }