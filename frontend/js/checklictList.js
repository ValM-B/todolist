import { finishedTasks } from "./finishedTasks.js";

export const checklistList = {

    container: null,

    init: function(){
        
        checklistList.container = document.querySelectorAll(".col-category");
      
        checklistList.container.forEach(colCategory => {

            const categoryId = colCategory.firstChild.id.slice(9);
            checklistList.getDataCategory(categoryId)
                .then(data => {
                
                    data.checklists.forEach(checklist => {
                
                    checklistList.addToChecklistList(checklist, colCategory);
                    });
                })
                .catch(error => {
                    return error;
                })
        });
    },

    getDataCategory: async function(categoryId){
        const response = await fetch("http://127.0.0.1:8000/api/categories/"+categoryId);
        return await response.json();
    },

    addToChecklistList: function(checklist, colCategory){
        const newDiv = document.createElement("div");
        newDiv.classList.add("col__item");
        newDiv.id="col-checklist-"+checklist.id;
        const h2 = document.createElement("h2");
        h2.textContent = checklist.name;
        newDiv.append(h2);
        colCategory.append(newDiv);
        checklistList.addTasks(checklist);
    },

    addTasks: function(checklist){
        console.log(checklist)
        checklistList.getDataChecklist(checklist.id)
        .then(data => {
            const newUl = document.createElement("ul");
            data.tasks.forEach(task => {
                
                const newLi = document.createElement("li");
                const newCheckbox = document.createElement("input");        
                const newLabel = document.createElement("label");
                newLi.append(newCheckbox, newLabel); 
                newCheckbox.id = `task-${task.id}`;
                newCheckbox.type = "checkbox";           
                newLabel.setAttribute("for", newCheckbox.id);
                newLabel.textContent = task.name;
                newLabel.id = `${newCheckbox.id}-label`
                newUl.append(newLi);
                finishedTasks.init();
            });
            document.getElementById("col-checklist-"+checklist.id).append(newUl);
        })
        .catch(error => {
            return error;
        })
    },

    getDataChecklist: async function(checklistId){
        const response = await fetch ("http://127.0.0.1:8000/api/checklists/"+checklistId);
        return await response.json();
    }


}