//exercitiu
function increaseSalary(salaries, percentage){
    if(!Array.isArray(salaries)){
        throw new Error('The first parameter need to be an array');
    }

    if(typeof percentage!==number){
        throw new Error('The second parameter need to be a number');
    }

    if(isNaN(percentage)){
        throw new Error('Percentage isnt a valid number');
    }

    const factor=1+(percentage/100);

    return salaries.map(salary=>salary*factor);
}

console.log("\n-------------------\n")

//case 1 - with succes
try {
    const initialSalaries = [2000, 3500, 5000];
    const newSalaries = increaseSalary(initialSalaries, 10); 
    console.log("Cazul de succes:", newSalaries); 
    console.error(err.message);
}catch(err){
    console.error(err.message);
}

//case 2 - with error (the first parameter isnt an array)
try {
    const newSalaries = increaseSalary("nu sunt array", 10);
    console.log("Acest mesaj nu ar trebui sa apara.");
} catch (err) {
    console.error("Eroare (param 1):", err.message); 
}

//case 3 - with error (the second parameter isnt a number)
try {
    const newSalaries = increaseSalary([2000, 3000], "zece");
    console.log("Acest mesaj nu ar trebui sa apara.");
} catch (err) {
    console.error("Eroare (param 2):", err.message); 
}

//
//exemplu din video
// const orderCoffee=(type)=>{
//     const types={
//         REGULAR: 'REGULAR',
//         SPECIAL: 'SPECIAL'
//     }

//     if(Object.values(types).indexOf(type)===-1){
//         throw new Error('coffee error')
//     }else{
//         console.log(`preparing ${type} coffee`)
//     }
// }

// try{
//     orderCoffee('REGULAR')
//     orderCoffee('SWEET_COFFEE_NO_SUGAR')
// }catch(err){
//     console.log(err)
// }