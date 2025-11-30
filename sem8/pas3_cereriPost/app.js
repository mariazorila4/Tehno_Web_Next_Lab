const express=require('express');
const app=express();
const port=3000;
const Book=require('./Book');
const Joi=require('joi');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const bookRouter=express.Router();
app.use('/api', bookRouter);

//pas2 - serverSimplu
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

bookRouter.route('/books')

.get((req, res)=>{
    let filterBooks=[];
    if(req.query.genre){
        filterBooks=books.filter(x=>x.genre==req.query.genre);
    }else{
        filterBooks=books;
    }
    res.json(filterBooks);
})//pas3_ cereri post
.post((req, res)=>{
    let newBook=new Book(req.body.id, req.body.name, req.body.genre, req.body.author);
    books.push(newBook);
    console.log(books);

    return res.json(newBook);
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

//pas3 - cereri post
//cerere post cu validare inainte de salvare
app.post('/addBookWithValidation', (req, res)=>{
    const book=Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        genre: Joi.string().required(),
        author: Joi.string().required()
    })

    const{error, value}=book.validate(req.body);

    if(error) return res.status(404).send({message: error.details[0].message});
    let newBook=new Book(req.body.id, req.body.name, req.body.genre, req.body.author);
    books.push(newBook);
    console.log(books);

    return res.status(201).json(newBook);
})


//pas 4 _ parametrii de rutare
bookRouter.route('/books/:bookId')
.put((req, res)=>{
    bookModif=books.find(x=>x.id==Number(req.params.bookId));
    bookModif.name=req.body.name;
    bookModif.genre=req.body.genre;
    bookModif.author=req.body.author;

    return res.json(bookModif);
})//delete in functie de id
.delete((req, res)=>{
    const index=books.findIndex(x=>x.id===Number(req.params.bookId));
    const deletedBook=books.splice(index, 1)[0];

    return res.json(deletedBook);
})