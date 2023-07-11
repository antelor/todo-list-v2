import { Item } from "./modules/item";
import { Folder } from "./modules/folder";
import './styles/main.scss'; 
import './styles/folder.scss';
import './styles/item.scss';


//Container of all folders
let folderContainer = {
    currentIndex: 0,
    folders: [],
    addFolder: function(folder){
        this.folders.push(folder);
        this.currentIndex = this.folders.length - 1;
    },
    removeFolder: function(folderName){
        this.folders = this.folders.filter((folder) => folder.name !== folderName);
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
        this.folders.forEach((folder, index) => {
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
                this.renderForm();
                
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

        let addFolderDiv = document.createElement('div')
        let addFolderInput = document.createElement('input');
        addFolderInput.setAttribute('id', 'folderInput');

        let addFolderBtn = document.createElement('button');
        addFolderBtn.textContent='+';
        addFolderDiv.appendChild(addFolderInput);
        addFolderDiv.appendChild(addFolderBtn);
        document.querySelector('.folderMenu').appendChild(addFolderDiv);

        
        addFolderBtn.addEventListener('click', () => {
            let newFolder = new Folder( document.getElementById('folderInput').value );
            this.addFolder(newFolder);
            this.renderFolders();
            document.querySelector('.itemDisplay').innerHTML = "";
            document.querySelector('.itemDisplay').appendChild(this.renderActiveItems());
    });

    },
    renderActiveItems: function(){
        let itemList = document.createElement('div');
        itemList.classList.add('itemList');

        //for each item in the current active folder show render it
        this.folders[this.currentIndex].items.forEach((item) => {
            let itemDiv = item.renderItem();
            itemDiv.classList.add(item.priority)
            let delButton = document.createElement('button');
            delButton.textContent = 'D';
            
            delButton.addEventListener('click', (e)=>{
                this.folders[this.currentIndex].deleteItem(item);
                document.querySelector('.itemDisplay').innerHTML = "";
                document.querySelector('.itemDisplay').appendChild(this.renderActiveItems());
                this.renderForm();
            });
            
            itemDiv.appendChild(delButton);
            itemList.appendChild(itemDiv);
        })

        return itemList;
    },
    renderForm: function(){
        let formDiv = document.createElement('div');
        formDiv.classList.add('formDiv')
        formDiv.classList.add('itemCard')
        formDiv.innerHTML=`
        <h1> + </h1>
        <form class="itemForm">
            <input type="text" name="itemName" id="itemName" value="New item name">
            <input type="date" name="itemDate" id="itemDate" value="1111-11-11">
            <select name="itemPriority" id="itemPriority" aria-placeholder="Priority">
                <option value="urgPrio">High</option>
                <option value="midPrio">Normal</option>
                <option value="lowPrio">Low</option>
            </select>
            <input type="desc" name="itemDesc" id="itemDesc" value="a">
            <button type="button" id="addItemButton">+</button>
        </form>
        `;
        document.querySelector('.itemList').appendChild(formDiv);
        document.getElementById('addItemButton').addEventListener('click', (e) => this.createItem());

    },
    createItem: function(){
        let itemName = document.getElementById('itemName').value;
        let itemDate = document.getElementById('itemDate').value;
        let itemDesc = document.getElementById('itemDesc').value;
        let itemPriority = document.getElementById('itemPriority').value;

        let newItem = new Item(itemName, itemDesc, itemDate, itemPriority);

        this.folders[this.currentIndex].addItem(newItem);

        console.log(document.querySelector('.itemDisplay'));
        document.querySelector('.itemDisplay').innerHTML="";
        document.querySelector('.itemDisplay').appendChild(this.renderActiveItems());
        this.renderForm();
    }
};

//Default folder creation
let defaulFolder = new Folder('carpeta');
folderContainer.addFolder(defaulFolder);

let defaulFolder2 = new Folder('carpeta2');
folderContainer.addFolder(defaulFolder2);

let defaulFolder3 = new Folder('carpeta3');
folderContainer.addFolder(defaulFolder3);

let itemtest = new Item('supermercado','banana papa pera','11-07-23','urgPrio');
let itemtest2 = new Item('asdasd','banana papa','11-07-23','midPrio');
let itemtest3 = new Item('supermercado2','banana papa','11-07-23','lowPrio');
let itemtest4 = new Item('aaaa', 'aaa', '11-07-23', 'midPrio');
defaulFolder2.addItem(itemtest2);
defaulFolder2.addItem(itemtest3);
defaulFolder3.addItem(itemtest4);
defaulFolder.addItem(itemtest);

folderContainer.currentIndex = 0;
folderContainer.renderFolders();
