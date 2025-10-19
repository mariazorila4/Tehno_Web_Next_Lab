//exercice
const formatString=(s, param)=>{
    let modified=s;

    for(const key in param){
        if(param.hasOwnProperty(key)){
            const placeHolder=`{${key}}`;
            const value=param[key];

            while(modified.includes(placeHolder)){
                modified=modified.replace(placeHolder, value);
            }
        }
    }
    return modified;
}

const param={substantiv: "calut", adjectiv:"dragut"};
const result=formatString("un {substantiv} este {adjectiv}", param);
console.log(result);

//example from video
// const formatString=(s, ...format)=>{
//     let modified=s

//     for(let i=0; i<format.length; i++){
//         if(modified.indexOf('{'+i+'}')!==-1){
//             modified=modified.replace('{'+i+'}', format[i])
//         }
//     }
//     return modified
// }

// console.log(formatString("this is a {0} string and we've {1} it", "nice", "modified"))
