import {finishedTasks} from "./finishedTasks.js";

export const newList = {

    categoryId : null,
    btnAddList: null,
    btnTaskList: null,
    containerTaskList: null,
    newList: null,

    init :function(){
        newList.containerTaskList = document.querySelector(".task-list");
        const btns = document.querySelectorAll(".add-list");
        newList.btnTaskList= document.querySelector(".to-task-list");
        const btnNewTask= document.querySelectorAll(".add-new-task");
        for (const btn of btns) {
            btn.addEventListener("click", newList.handleClick);
        }
        
        btnNewTask.forEach(btn => {
            btn.addEventListener("click", newList.handleClickAddTask);
        });
        newList.btnTaskList.addEventListener("click", newList.handleClickTaskList);
    },

    handleClick : function(event){

        const btnId = event.currentTarget.id;
        newList.categoryId = btnId.slice(9)
        // const container = document.querySelector(`.${btnId}`)
        // console.log(container);
        // newList.newDiv = document.createElement("div");
        // newList.newDiv.classList.add("col__item");
        // const h2 = document.createElement("h2");
        // newList.title = prompt("Entrer le nom de la liste");
        // h2.textContent = newList.title;
        // newList.newDiv.append(h2);
        // container.append(newList.newDiv);
        // newList.createTask()

    },

    // createTask : function(){
    //     newList.newTasks = [];
    //     let createNewTask = false
        
    //     do {
    //         newList.newTasks.push(prompt("Entrer une nouvelle tache."))
    //         createNewTask = confirm("Créer une nouvelle tache ?")
    //     } while (createNewTask);
    //     newList.createList();
        
        
        
    // },

    // createList : function(){

    //     const newUl = document.createElement("ul");
    //     for (let index = 0; index < newList.newTasks.length; index++) {
            
    //         const newLi = document.createElement("li");
    //         const newCheckbox = document.createElement("input");
    //         const newLabel = document.createElement("label");
    //         newLi.append(newCheckbox, newLabel);            
    //         newCheckbox.id = `tache_${newList.title}_${index}`;
    //         newCheckbox.type = "checkbox";
    //         newLabel.setAttribute("for", newCheckbox.id);
    //         newLabel.textContent = newList.newTasks[index];
    //         newLabel.id = `${newCheckbox.id}_label`
    //         newUl.append(newLi);
    //     }
        
    //     newList.newDiv.append(newUl);
    //     finishedTasks.init();
    // },

    handleClickTaskList: function(){
        if(newList.containerTaskList.childElementCount === 0){
            const listToAdd = {
                name: document.getElementById("list-name").value,
                category_id: newList.categoryId
            }
            newList.addList(listToAdd);
            
        }
    },

    addList: async function(listToAdd){
        const response = await fetch("http://127.0.0.1:8000/api/checklists", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listToAdd)
            })
        
        const data = await response.json();
        

        if(data.status === "success"){
			newList.newList = data.checklist;
        }
    },

    handleClickAddTask: function(){
        console.log(newList.newList.id)
        const taskToAdd = {
            name: document.getElementById("task-name").value,
            checklist_id: newList.newList.id
        }
        newList.addTask(taskToAdd);

    },

    addTask: async function(taskToAdd){
        const response= await fetch("http://127.0.0.1:8000/api/tasks", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToAdd)
        });

        const data = await response.json();
        if(data.status === "success"){
            const newLi = document.createElement("li");
            newLi.textContent = taskToAdd.name;
            newList.containerTaskList.append(newLi);
            document.getElementById("task-name").value ="";
        }
    }
}