import fs from 'fs'

//definirea claselor de erori
class InvalidType extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidType";
    }
}

class InvalidInput extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidInput";
    }
}

//logica de compresie rle care primeste string, nu fisier
function rleCompressLogic(input) {
    //validare generala
    if (typeof input !== 'string') {
        throw new InvalidType("Input-ul trebuie sa fie un string.");
    }

    //nu permitem numere in string-ul care urmeaza a fi comprimat
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (char >= '0' && char <= '9') {
            throw new InvalidInput("Input-ul pentru compresie RLE nu poate contine numere.");
        }
    }

    if (input.length === 0) {
        return "";
    }

    //procesul de compresie
    let result = "";
    let count = 1;

    for (let i = 0; i < input.length; i++) {
        if (i === input.length - 1 || input[i] !== input[i + 1]) {
            result += count + input[i];
            count = 1;
        } else {
            count++;
        }
    }

    return result;
}

function compressFileRLE(inputPath, outputPath){
    try{
        //citeste sincron fisierul de intrare
        const originalContent=fs.readFileSync(inputPath, 'utf-8');

        console.log(`Continut original din ${inputPath}:`);
        console.log(`"${originalContent}"`);

        //arunca erori dc input-ul este invalid
        const compressedContent=rleCompressLogic(originalContent);

        //scrie sincron fisierul de iesire
        fs.writeFileSync(outputPath, compressedContent, 'utf-8');

        console.log(`\nContinut comprimat (salvat in ${outputPath}):`);
        console.log(`"${compressedContent}"`);
        console.log("\n>>> Compresie finalizata cu succes!");
    }catch(err){
        //prinde erorile de la fs sau 'rleCompressLogic'
        if(err.name==='InvalidType'||err.name==='InvalidInput'){
            console.error(`\nEroare de procesare: [${err.name}] ${err.message}`);
        }else{
            console.error(`\nA aparut o eroare de sistem:`, err.message);
        }
    }
}

const inputFile = 'intrare.txt';
const outputFile = 'comprimat.rle';
const testContent = "WWWWBBBAAAAAAZZZ";

//pregatim fisierul de test
try {
    fs.writeFileSync(inputFile, testContent);
    
    //rulam functia de compresie
    compressFileRLE(inputFile, outputFile);
} catch (e) {
    console.error("Eroare la rulare:", e);
}

//testam si cazul de eroare (input cu numere)
const inputFileError = 'intrare_eroare.txt';
const testContentError = "AAA123BBB";

try {
    fs.writeFileSync(inputFileError, testContentError);
    console.log(`\n---------------------------------`);
    console.log(`Se testeaza cazul de eroare (cu numere)...`);
    
    //rulam functia pe fisierul invalid
    compressFileRLE(inputFileError, outputFile);
} catch (e) {
    console.error("Eroare la rulare:", e);
}