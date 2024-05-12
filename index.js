import { program } from "commander";
import inquirer from "inquirer";
import { checkSliceFolderFileExists, isExistsAllSlices, createFullSlices , createIndiviualSlice} from './src/create-full.js'

program.version("1.0.0").description("FSD Folder Template");

program.action(async () => {
    const selectedChoice = await inquirer.prompt([
        {
            type: "list",
            name: "opts",
            choices: [
                "full",
                "individual"
            ],
            message: "Please, Select you create fsd slice"
        }
    ]);

    await inquirer.prompt([{
        type: "input",
        name: "folderName",
        message: "Please, enter folder name",
    }]).then((answers) => {
        console.log("answers :::", answers);
        const { isValid, message } = isExistsAllSlices();
        if(isValid){
            if(selectedChoice.opts === 'full'){
                createFullSlices(answers);
            }
            else{
                //create individual slice folder
                //check is already exists same folder name of not
                //where the slice folder can be created or not
                inquirer.prompt([{
                    type: "list",
                    name: "sliceName",
                    choices: [                       
                        "entities",
                        "features",
                        "widgets",
                        "pages",
                    ],
                    message: "Please, select slice name",
                }]).then((result) => {
                    const { sliceName } =  result;
                    console.log("slice Name :::", sliceName);
                    if(!checkSliceFolderFileExists(process.cwd()+'/test/'+sliceName).isValid){
                        //create folder the slice
                        createIndiviualSlice(answers, sliceName);
                    }
                })
            }
          
            console.log("answers ::", answers)
        }
    })

   
})

program.parse(process.argv);