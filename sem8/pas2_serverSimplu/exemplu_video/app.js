const express=require('express');
const app=express();
const port=3000;
const Book=require('./Book');

app.get('/', (req, res)=>{
    res.send('Welcome to my API');
})

app.listen(port, ()=>{
    console.log('Running on port'+port);
})

let books=[new Book(1, "Foundation", "sf", "Asimov"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Dune", "sf", "Frank Herbert")
]

app.get('/books', (req, res)=>{
    let filterBooks=[];
    if(req.query.genre){
        filterBooks=books.filter(x=>x.genre==req.query.genre);
    }else{
        filterBooks=books;
    }
    res.json(filterBooks);
})

//cerinta nextlab - afisare carti in ordine alfabetica
app.get('/books/sortedBooks', (req, res)=>{
   let alphabetical_books=[...books];

   alphabetical_books.sort((b1, b2)=>{
        let name1=b1.name.toLowerCase();
        let name2=b2.name.toLowerCase();

        if(name1>name2){
            return 1;
        }else if(name1<name2){
            return -1;
        }else return 0;     
    })
   
   res.json(alphabetical_books);
})