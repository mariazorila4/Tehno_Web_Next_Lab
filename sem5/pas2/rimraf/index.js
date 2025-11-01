const fs=require('fs').promises;
const path=require('path');
const {rimraf}=require('rimraf');

const dirName='director';
const fileName='file.txt';
const dirPath=path.join(__dirname, dirName);
const filePath=path.join(dirPath, fileName);

async function manageDirectory(){
    try{
        console.log(`Create directory: ${dirPath}`);
        await fs.mkdir(dirPath);

        console.log(`Create file: ${filePath}`);
        await fs.writeFile(filePath, 'Test');

        console.log(`Delete directory: ${dirPath}`);
        await rimraf(dirPath);
    }catch(err){
        console.error(err);
    }
}

manageDirectory();