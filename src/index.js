import { Item } from './modules/item'
import { Folder } from './modules/folder'
import './styles/main.scss'
import './styles/folder.scss'
import './styles/item.scss'

// Container of all folders
const folderContainer = {
  currentIndex: 0,
  folders: [],
  addFolder: function (folder) {
    this.folders.push(folder)
    this.currentIndex = this.folders.length - 1
  },
  removeFolder: function (folderName) {
    this.folders = this.folders.filter((folder) => folder.name !== folderName)
  },
  getCurrentFolder: function () {
    return this.folders[this.currentIndex]
  },
  searchFolder: function (folderName) {
    // Returns array with only searched folder, then extracts the folder from it
    // (filter returns array)
    const foundFolderArray = this.folders.filter(
      (folder) => folder.name === folderName
    )
    const foundFolder = foundFolderArray[0]
    const folderIndex = this.folders.indexOf(foundFolder)

    this.changeIndex(folderIndex)
    return foundFolder
  },
  renderFolders: function () {
    document.querySelector('.folderMenu').innerHTML = ''

    const folderList = document.createElement('div')
    folderList.classList.add('folderList')

    // for each folder in the folderlist create the div and add the active folder click listener
    this.folders.forEach((folder, index) => {
      // folderDiv -> 2 children: folderContent and delButton
      const folderDiv = document.createElement('div')
      const folderContent = folder.renderFolder()

      folderDiv.classList.add('folderDiv')
      folderContent.classList.add('folderContent')

      folderDiv.appendChild(folderContent)
      folderList.appendChild(folderDiv)

      // active selector event listener
      folderContent.addEventListener('click', (e) => {
        if (document.querySelector('.active')) {
          document.querySelector('.active').classList.remove('active')
        }
        this.currentIndex = this.folders.indexOf(folder)
        document.querySelector('.itemDisplay').innerHTML = ''
        document
          .querySelector('.itemDisplay')
          .appendChild(this.renderActiveItems())
        this.renderForm()

        folderDiv.classList.add('active')
      })

      // delete button logic and listener
      const delButton = document.createElement('button')
      delButton.classList.add('delFolderButton')
      delButton.textContent = '🗑️'
      folderDiv.appendChild(delButton)

      delButton.addEventListener('click', (e) => {
        console.log(folder.name)
        this.removeFolder(folder.name)
        this.renderFolders()
        document.querySelector('.itemDisplay').innerHTML = ''
      })
    })

    document.querySelector('.folderMenu').appendChild(folderList)

    const addFolderDiv = document.createElement('div')
    const addFolderInput = document.createElement('input')
    addFolderInput.setAttribute('id', 'folderInput')
    addFolderInput.setAttribute('placeholder', 'Enter Folder Name')

    const addFolderBtn = document.createElement('button')
    addFolderBtn.classList.add('addFolderBtn')
    addFolderBtn.textContent = '+'
    addFolderDiv.appendChild(addFolderInput)
    addFolderDiv.appendChild(addFolderBtn)
    document.querySelector('.folderMenu').appendChild(addFolderDiv)


    addFolderBtn.addEventListener('click', () => {
      if (folderFormValidation()) {
        const newFolder = new Folder(
          document.getElementById('folderInput').value
        )
        this.addFolder(newFolder)
        this.renderFolders()
        document.querySelector('.itemDisplay').innerHTML = ''
        document
          .querySelector('.itemDisplay')
          .appendChild(this.renderActiveItems())
      }
    })
  },
  renderActiveItems: function () {
    const itemList = document.createElement('div')
    itemList.classList.add('itemList')

    // for each item in the current active folder show render it
    this.folders[this.currentIndex].items.forEach((item) => {
      const itemDiv = item.renderItem()
      itemDiv.classList.add(item.priority)
      const delButtonDiv = document.createElement('div')
      delButtonDiv.classList.add('delButtonDiv')
      const delButton = document.createElement('button')
      delButton.textContent = '🗑️'
      delButtonDiv.appendChild(delButton)

      delButton.addEventListener('click', (e) => {
        this.folders[this.currentIndex].deleteItem(item)
        document.querySelector('.itemDisplay').innerHTML = ''
        document
          .querySelector('.itemDisplay')
          .appendChild(this.renderActiveItems())
        this.renderForm()
      })

      itemDiv.appendChild(delButtonDiv)
      itemList.appendChild(itemDiv)
    })

    return itemList
  },
  renderForm: function () {
    const formDiv = document.createElement('div')
    formDiv.classList.add('formDiv')
    formDiv.classList.add('itemCard')
    formDiv.innerHTML = `
        <form class="itemForm">
            <input type="text" name="itemName" id="itemName" placeholder="New item name">
            <input type="date" name="itemDate" id="itemDate" placeholder="2023-07-15">
            <select name="itemPriority" id="itemPriority" aria-placeholder="Priority">
                <option value="urgPrio">High</option>
                <option value="midPrio">Normal</option>
                <option value="lowPrio">Low</option>
            </select>
            <input type="desc" name="itemDesc" id="itemDesc" placeholder="Enter Item Description">
            <button type="button" id="addItemButton">+</button>
        </form>
        <h1> + </h1>
        `
    document.querySelector('.itemList').appendChild(formDiv)
    document
      .getElementById('addItemButton')
      .addEventListener('click', (e) => this.createItem())
  },
  createItem: function () {
    const itemName = document.getElementById('itemName').value
    const itemDate = document.getElementById('itemDate').value
    const itemDesc = document.getElementById('itemDesc').value
    const itemPriority = document.getElementById('itemPriority').value

    if (itemName && itemDate && itemDesc && itemPriority) {
      const newItem = new Item(itemName, itemDesc, itemDate, itemPriority)

      this.folders[this.currentIndex].addItem(newItem)

      console.log(document.querySelector('.itemDisplay'))
      document.querySelector('.itemDisplay').innerHTML = ''
      document
        .querySelector('.itemDisplay')
        .appendChild(this.renderActiveItems())
      this.renderForm()
    } else {
      alert("Item can't have empty fields")
    }
  }
}

//Folder Form Validation
function folderFormValidation() {
  const folderName = document.getElementById('folderInput').value
  const folderNames = folderContainer.folders.map((folder) => folder.name)
  if (folderNames.includes(folderName)) {
    alert('Folder name already exists')
    return false
  } else if (!folderName) {
    alert('Folder name cannot be empty')
    return false
  } else {
    return true
  }
}


// Default folder creation
const defaulFolder = new Folder('demo folder 1')
folderContainer.addFolder(defaulFolder)

const defaulFolder2 = new Folder('demo folder 2')
folderContainer.addFolder(defaulFolder2)

const defaulFolder3 = new Folder('demo folder 3')
folderContainer.addFolder(defaulFolder3)

const itemtest = new Item(
  'This is a demo Item',
  'This is a demo description',
  '19-07-23',
  'urgPrio'
)
const itemtest2 = new Item('This is a demo Item',
  'This is a demo description',
  '19-07-23',
  'lowPrio')
const itemtest3 = new Item(
  'This is a demo Item',
  'This is a demo description',
  '19-07-23',
  'midPrio'
)
const itemtest4 = new Item(
  'This is a demo Item',
  'This is a demo description',
  '19-07-23',
  'urgPrio')

defaulFolder2.addItem(itemtest2)
defaulFolder2.addItem(itemtest3)
defaulFolder3.addItem(itemtest4)
defaulFolder.addItem(itemtest)

folderContainer.currentIndex = 0
folderContainer.renderFolders()

