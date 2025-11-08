let evenCollection=document.querySelectorAll("tbody tr:nth-child(even)")
let oddColection=document.querySelectorAll("tbody tr:nth-child(odd)")

if(evenCollection && evenCollection.length>0){
    for(let item of evenCollection)
        item.bgColor='red'
}

if(oddColection && oddColection.length>0){
    for(let item of oddColection)
        item.bgColor='yellow'
}