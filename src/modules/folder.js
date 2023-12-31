export class Folder {
  constructor (name) {
    this.name = name
    this.items = []
  }

  getItems () {
    return this.items
  }

  addItem (item) {
    this.items.push(item)
  }

  deleteItem (item) {
    const index = this.items.indexOf(item)
    if (index > -1) {
      // only splice array when item is found
      this.items.splice(index, 1) // 2nd parameter means remove one item only
    }
  }

  // render folder menu
  renderFolder () {
    const folderCard = document.createElement('div')
    folderCard.classList.add('folderContent')

    const folderName = document.createElement('h1')
    folderName.textContent = this.name
    folderCard.appendChild(folderName)

    return folderCard
  }
}
