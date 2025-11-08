const evenCollection=document.querySelectorAll("tbdoy tr:nth-child(even)")
const oddColection=document.querySelectorAll("tbody tr:nth-child(odd)");
const firstChild=document.querySelectorAll("tbody tr:first-child");
const lastChild=document.querySelectorAll("tbody tr:last-child")

if(evenCollection && evenCollection.length>0){
    for(let item of evenCollection)
        item.bgColor="white";
}

if(oddColection && oddColection.length>0){
    for(let item of oddColection)
        item.bgColor="purple";
}

if(firstChild && firstChild.length>0){
    for(let item of firstChild)
        item.bgColor="blue";
}

if(lastChild && lastChild.length==1){
    for(let item of lastChild)
        item.bgColor="green";
}