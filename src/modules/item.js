export class Item {
  constructor (name, desc, dueDate, priority) {
    this.name = name
    this.desc = desc
    this.dueDate = dueDate
    this.priority = priority
  }

  setName (newName) {
    this.name = newName
  }

  setDesc (newDesc) {
    this.desc = newDesc
  }

  setDueDate (newDueDate) {
    this.dueDate = newDueDate
  }

  setPriority (newPriority) {
    this.priority = newPriority
  }

  renderItem () {
    const itemCard = document.createElement('div')
    itemCard.classList.add('itemCard')

    const itemName = document.createElement('h1')
    itemName.textContent = this.name
    itemCard.appendChild(itemName)

    const itemDueDate = document.createElement('p2')
    itemDueDate.textContent = this.dueDate
    itemCard.appendChild(itemDueDate)

    const itemDesc = document.createElement('p')
    itemDesc.textContent = this.desc
    itemCard.appendChild(itemDesc)

    return itemCard
  }
}
