//exercitiu
class Stream{
    #value;
    #nextValue

    static #count=0

    constructor(value, nextValue){
        this.#value=value
        this.#nextValue=nextValue
        Stream.#count++
    }

    get value(){
        return this.#value
    }

    get next(){
        this.#value=this.#nextValue(this.#value)
        return this.#value
    }

    static get count(){
        return Stream.#count
    }
}

class SirPareStream extends Stream{
    constructor(initialValue){
        let firstValue;

        if(initialValue%2===0){
            firstValue=initialValue;
        }else{
            firstValue=initialValue+1;
        }

        const nextValueFunction=currentValue=>currentValue+2;

        super(firstValue-2, nextValueFunction)
    }
}

const evenSequenceFrom3=new SirPareStream(3);
for(let i=0;i<3;i++){
    console.log(`evenSequenceFrom3[${i}]=${evenSequenceFrom3.next}`);
}
console.log("\n_______________________________\n");

const evenSequenceFrom4=new SirPareStream(4);
for(let i=0;i<5;i++){
    console.log(`evenSequenceFrom4[${i}]=${evenSequenceFrom4.next}`);
}


//exemplu din video
// class Stream{
//     #value;
//     #nextValue

//     static #count=0
//     constructor(value, nextValue){
//         this.#value=value
//         this.#nextValue=nextValue
//         Stream.#count++
//     }

//     get value(){
//         return this.#value
//     }

//     get next(){
//         this.#value=this.#nextValue(this.#value)
//         return this.#value
//     }

//     static get count(){
//         return Stream.#count
//     }
// }

// class ConstantStream extends Stream{
//     constructor(value){
//         super(value, value=>value)
//     }
// }

// class NextIntegerStream extends Stream{
//     constructor(){
//         super(0, value=>value+1)
//     }
// }

// const constant=new ConstantStream(1)
// const nextInteger=new NextIntegerStream()

// for(let i=0;i<10;i++){
//     console.log(`constant[${i}]=${constant.next}`)
//     console.log(`nextInteger[${i}]=${nextInteger.next}`)
// }

// console.log(Stream.count)