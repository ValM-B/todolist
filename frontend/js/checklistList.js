import { editChecklist } from "./editChecklist.js";
import { finishedTasks } from "./finishedTasks.js";

export const checklistList = {

    container: null,

    init: function(){
        
        checklistList.container = document.querySelectorAll(".col-category");
      
        checklistList.container.forEach(colCategory => {
            checklistList.displayChecklist(colCategory);
           
        });
    },

    displayChecklist: function(colCategory){
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
    },
    
    getDataCategory: async function(categoryId){
        const response = await fetch("http://127.0.0.1:8000/api/categories/"+categoryId);
        return await response.json();
    },

    addToChecklistList: function(checklist, colCategory){
        
        const checklistTemplate = document.querySelector("#checklist-template");
        const checklistElement = checklistTemplate.content.cloneNode(true);
        checklistElement.querySelector(".container-checklist").id = "col-checklist-"+checklist.id;
        checklistElement.querySelector("h2").textContent = checklist.name;
        //const newDiv = document.createElement("div");
        //newDiv.classList.add("col__item");
        //newDiv.id=
        //const btnEdit = document.createElement("button");
        //const btnIcon = document.createElement("i");
        //btnIcon.classList.add("fa-solid", "fa-pen")
       // btnEdit.append(btnIcon);
        //btnEdit.classList.add("btn", "btn-edit");
        //const h2 = document.createElement("h2");
        //h2.textContent = 
        //newDiv.append(h2, btnEdit);
        colCategory.append(checklistElement);
        checklistList.addTasks(checklist);
        editChecklist.init();
    },

    addTasks: function(checklist){
        checklistList.getDataChecklist(checklist.id)
        .then(data => {
            const checklistElement = document.querySelector(`#col-checklist-${checklist.id}`);
            const taskListContainer = checklistElement.querySelector(`ul`);
            console.log(taskListContainer);
            data.tasks.forEach(task => {
                
                const newLi = document.createElement("li");
                const newCheckbox = document.createElement("input");        
                const newLabel = document.createElement("label");
                newLi.append(newCheckbox, newLabel); 
                newCheckbox.id = `task-${task.id}`;
                newCheckbox.type = "checkbox"; 
                newCheckbox.addEventListener("change", finishedTasks.handleChange);
                if(task.status == 0){
                    newCheckbox.checked = true;
                    newLabel.classList.add ("checked");
                } else {
                    checklistElement.querySelector(`.btn-delete-checklist`).hidden = true;
                    checklistElement.querySelector(`.confetti-canvas`).hidden = true;
                    checklistElement.querySelector(".btn-edit").hidden = false;
                }
                newLabel.setAttribute("for", newCheckbox.id);
                newLabel.textContent = task.name;
                newLabel.id = `${newCheckbox.id}-label`
                taskListContainer.append(newLi);
                
            });
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