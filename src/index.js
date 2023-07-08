import { Item } from "./item";
import { Folder } from "./folder";

//Container of all folders
let folderContainer = {
    currentIndex: -1,
    folders: [],
    addFolder: function(folder){
        this.folders.push(folder);
        this.currentIndex = this.folders.length - 1;
    },
    removeFolder: function(folderName){
        this.folders = this.folders.filter((folder) => folder.name !== folderName);
    },
    changeIndex: function(newIndex){
        this.currentIndex = newIndex;
    },
    getCurrentFolder: function(){
        return this.folders[this.currentIndex];
    },
    searchFolder: function(folderName){
        //Returns array with only searched folder, then extracts the folder from it
        //(filter returns array)
        let foundFolderArray = this.folders.filter((folder) => folder.name === folderName);
        let foundFolder = foundFolderArray[0];
        let folderIndex = this.folders.indexOf(foundFolder);
        
        this.changeIndex(folderIndex);
        return foundFolder;
    }
};

//Default folder creation
let defaulFolder = new Folder('carpeta');
folderContainer.addFolder(defaulFolder);
let defaulFolder2 = new Folder('carpeta2');
folderContainer.addFolder(defaulFolder2);


let itemtest = new Item('a','a','a','a');
let itemtest2 = new Item('b','b','b','b');
defaulFolder.addItem(itemtest);
defaulFolder2.addItem(itemtest2);


console.log(folderContainer.searchFolder('carpeta2'));
console.log(folderContainer.currentIndex)