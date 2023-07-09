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
    },
    renderFolders: function(){
        let folderList = document.createElement('div');
        folderList.classList.add('folderList');

        //for each folder in the folderlist
        this.folders.forEach((folder) => {
            folderList.appendChild(folder.renderFolder());
        })

        return folderList;
    },
    renderActiveFolder: function(){
        let itemList = document.createElement('div');
        itemList.classList.add('itemList');

        //for each item in the current active folder
        this.folders[this.currentIndex].items.forEach((item) => {
            itemList.appendChild(item.renderItem());
        })

        return itemList;
    }
};

//Default folder creation
let defaulFolder = new Folder('carpeta');
folderContainer.addFolder(defaulFolder);
let defaulFolder2 = new Folder('carpeta1');
folderContainer.addFolder(defaulFolder2);


let itemtest = new Item('a','a','a','a');
let itemtest2 = new Item('b','b','b','b');
defaulFolder.addItem(itemtest);
defaulFolder2.addItem(itemtest2);


console.log(folderContainer.searchFolder('carpeta1'));
console.log(folderContainer.currentIndex)


document.querySelector('.folderMenu').appendChild(folderContainer.renderFolders());
document.querySelector('.itemDisplay').appendChild(folderContainer.renderActiveFolder());