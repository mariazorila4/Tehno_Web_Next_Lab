function concatenateArrays(array1, array2){
    let result=new Array();
    if(array1.length===array2.length){
        for(var i=0; i<array1.length; i++){
            result.push(array1[i]);
            result.push(array2[i]);
        }
    }else{
        return -1;
    }
    return result;
}

let array1=["a", "b", "c"];
let array2=["1", "2", "3"];
console.log(concatenateArrays(array1, array2).join(" "));

//example from video
// function addToArray(){
//     let args=arguments;
//     let array=args[0]
//     for(var i=1; i<args.length; i++){
//         array.push(args[i]);
//     }
//     return array;
// }

// function addToArray(array, ...elements){
//     for(var i=0; i<elements.length; i++){
//         array.push(elements[i]);
//     }
//     return array;
// }

// let array=["ana", "are"];
// console.log(addToArray(array, "mere", "si", "pere").join(" "));