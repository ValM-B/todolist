import {finishedTasks} from "./finishedTasks.js";

export const newList = {
    init :function(){
        const btns = document.querySelectorAll("button");
        
        for (const btn of btns) {
            btn.addEventListener("click", newList.handleClick);
        }
    },

    handleClick : function(event){
        const btnId = event.currentTarget.id;
        const container = document.querySelector(`.col__${btnId}`)
        newList.newDiv = document.createElement("div");
        newList.newDiv.classList.add("col__item");
        const h2 = document.createElement("h2");
        newList.title = prompt("Entrer le nom de la liste");
        h2.textContent = newList.title;
        newList.newDiv.append(h2);
        container.append(newList.newDiv);
        newList.createTask()

    },

    createTask : function(){
        newList.newTasks = [];
        let createNewTask = false
        
        do {
            newList.newTasks.push(prompt("Entrer une nouvelle tache."))
            createNewTask = confirm("Créer une nouvelle tache ?")
        } while (createNewTask);
        newList.createList();
        
        
        
    },

    createList : function(){

        const newUl = document.createElement("ul");
        for (let index = 0; index < newList.newTasks.length; index++) {
            
            const newLi = document.createElement("li");
            const newCheckbox = document.createElement("input");
            const newLabel = document.createElement("label");
            newLi.append(newCheckbox, newLabel);            
            newCheckbox.id = `tache_${newList.title}_${index}`;
            newCheckbox.type = "checkbox";
            newLabel.setAttribute("for", newCheckbox.id);
            newLabel.textContent = newList.newTasks[index];
            newLabel.id = `${newCheckbox.id}_label`
            newUl.append(newLi);
         }
        
        newList.newDiv.append(newUl);
        finishedTasks.init();
    }
}