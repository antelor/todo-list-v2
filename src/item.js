export class Item{
    constructor(name, desc, dueDate, priority){
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    };

    setName(newName){
        this.name = newName;
    }

    setDesc(newDesc){
        this.desc = newDesc;
    }

    setDueDate(newDueDate){
        this.dueDate = newDueDate;
    }

    setPriority(newPriority){
        this.priority = newPriority;
    }
}