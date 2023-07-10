import { Item } from "./modules/item";
import { Folder } from "./modules/folder";
import './styles/main.scss'; 
import './styles/folder.scss';
import './styles/item.scss';


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
        document.querySelector('.folderMenu').innerHTML = "";

        let folderList = document.createElement('div');
        folderList.classList.add('folderList');

        //for each folder in the folderlist create the div and add the active folder click listener
        this.folders.forEach((folder) => {
            //folderDiv -> 2 children: folderContent and delButton
            let folderDiv = document.createElement('div');
            let folderContent = folder.renderFolder();
            
            folderDiv.classList.add('folderDiv');
            folderContent.classList.add('folderContent');

            folderDiv.appendChild(folderContent);
            folderList.appendChild(folderDiv);

            //active selector event listener
            folderContent.addEventListener('click', (e) => {
                if( document.querySelector('.active') ){
                    document.querySelector('.active').classList.remove('active');
                }

                this.currentIndex = this.folders.indexOf(folder);
                document.querySelector('.itemDisplay').innerHTML = "";
                document.querySelector('.itemDisplay').appendChild(this.renderActiveItems());

                folderDiv.classList.add('active');
            });

            //delete button logic and listener
            let delButton = document.createElement('button');
            delButton.classList.add('delFolderButton');
            delButton.textContent='D';
            folderDiv.appendChild(delButton);

            delButton.addEventListener('click', (e)=>{
                console.log(folder.name);
                this.removeFolder(folder.name);
                this.renderFolders();
                document.querySelector('.itemDisplay').innerHTML="";
            })
        })

        document.querySelector('.folderMenu').appendChild(folderList);
    },
    renderActiveItems: function(){
        let itemList = document.createElement('div');
        itemList.classList.add('itemList');

        //for each item in the current active folder
        this.folders[this.currentIndex].items.forEach((item) => {
            let itemDiv = item.renderItem();
            let delButton = document.createElement('button');
            delButton.textContent = 'D';
            
            delButton.addEventListener('click', (e)=>{
                this.folders[this.currentIndex].deleteItem(item);
                console.log('a');
                document.querySelector('.itemDisplay').innerHTML = "";
                document.querySelector('.itemDisplay').appendChild(this.renderActiveItems());
            });
            
            itemDiv.appendChild(delButton);
            itemList.appendChild(itemDiv);
        })

        return itemList;
    }
};

//Default folder creation
let defaulFolder = new Folder('carpeta');
folderContainer.addFolder(defaulFolder);
let defaulFolder2 = new Folder('carpeta1');
folderContainer.addFolder(defaulFolder2);


let itemtest = new Item('supermercado','banana papa pera','11-07-23','1');
let itemtest2 = new Item('supermercado2','banana papa','11-07-23','1');
let itemtest3 = new Item('supermercado2','banana papa','11-07-23','1');
defaulFolder.addItem(itemtest);
defaulFolder2.addItem(itemtest2);
defaulFolder2.addItem(itemtest3);

folderContainer.renderFolders();
document.querySelector('.itemDisplay').appendChild(folderContainer.renderActiveItems());
