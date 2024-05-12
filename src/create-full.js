import fs from 'node:fs';
import chalk from 'chalk';


const log = console.log;

const slices = ['pages', 'widgets', 'features', 'entities'];
const sliceMap = new Map([
    ["pages", ["model.ts", "index.ts", "store.ts"]],
    ["widgets", ["model.ts", "index.ts", "store.ts"]],
    ['features', ["model.ts", "index.ts", "store.ts"]],
    ['entities', ["api.ts", "index.ts", "store.ts"]]
])

export const checkSliceFolderFileExists = (dir,folderName) => {
    try{
        if(fs.existsSync(dir+'/'+folderName)){
            return {
                isValid: true,
                message: ''
            }
        }else{
            return {
                isValid:false,
                message: `not found folder name ${folderName} the dir ${dir+'/'+slices[s]+'/'}`,
            }
        }
    }catch(err) {
        const error = new Error(err);
        return {
            isValid: false,
            message: error.message,
        }
    }
   
}

export const isExistsAllSlices = () => {
    const dir  = process.cwd();
    try{
        for(let s = 0; s< slices.length;s++){
            if(fs.existsSync(dir+"/"+slices[s])){
                continue;
            }else{
                return { isValid: false, message: `file not found: ${dir+"/"+slices[s]}` }
            }
        }
    }catch(err){
        const error = new Error(err);
       return { 
          isValid: false,
          message: slices.length ? error.message : 'dir not found in feature sliced design pattern',
       }
    }

    //check in slices folder same name is exists folder
    
    return { isValid:true, message: ''};
}

export const isValidFolderPath = (dir) => {
    if(fs.existsSync(dir)){
        return true;
    }

    return false;
}


export const createFilesUnderSlice = (dir,sliceName, name) => {
    const selectedFolder = sliceMap.get(sliceName);
        for(let fileName of selectedFolder){
            if(!fs.existsSync(dir + '/' +fileName)){
                fs.writeFile(dir + '/' + fileName, '',() => '');
            }
        }
   
}

export const createFullSlices = (name) => {
    const { folderName  } = name;
    
    const dir = process.cwd();
    try{

        //checks all slices same folder name is exists
        for(let s = 0;s<slices.length;s++){
            if(!fs.existsSync(dir+"/"+slices[s] +'/'+ folderName)){
                continue;
            }
            else{
                throw new Error(`${ folderName} folder name exists on ${slices[s]}`);
            }
        }


        for(let s = 0; s< slices.length;s++){
            if(!fs.existsSync(dir+"/"+slices[s] +'/'+ folderName)){
                fs.mkdirSync(dir+'/'+slices[s]+'/'+ folderName );
                createFilesUnderSlice(dir+'/'+slices[s]+'/'+folderName,slices[s], folderName);
            }
        }
        log(chalk.green("slices created Succssfully"));
    }
    catch(err){
        const error = new Error(err);
        log(chalk.red(error.message));
    }
}

export const createIndiviualSlice = (name, sliceName) => {
    const { folderName } = name;
    const dir = process.cwd();
    try{
        if(!fs.existsSync(dir+'/'+sliceName +'/'+ folderName)){
            fs.mkdirSync(dir+'/'+sliceName + '/'+folderName);
            createFilesUnderSlice(dir+'/'+sliceName+'/'+folderName,sliceName, folderName);
        }else{
            throw new Error(`${folderName} folder name already exists on ${sliceName}`);
        }
        log(chalk.green("file created successfully!"));

    }catch(err){
        const error = new Error(err);
        log(chalk.red(error.message));
    }
      
}