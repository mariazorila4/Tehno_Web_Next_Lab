function checkWords(word1, word2){
    if(word1.length === word2.length){
        if(word1===word2){
            return "Identical words";
        }else{
            let letters=0;
            for(let i=0;i<word1.length;i++){
                if(word1[i]!==word2[i]){
                    letters++;
                }
            }
            if(letters===1){
                return "Almost identical words";
            }else{
                return "Different words by " + letters + " letters";
            }
        }
    }else{
        return -1;
    }
}

console.log(checkWords("maria", "maria"));
console.log(checkWords("maria", "Maria"));
console.log(checkWords("maria", "marina"));
console.log(checkWords("acasa", "carte"));



//example from video
//function checkDivisible(n, divisor){
 //   if(n%divisor){
//      return false;
  //  }else{
    //    return true;
    //}
//}

    //console.log(checkDivisible(10,2));
    //console.log(checkDivisible(10,3));