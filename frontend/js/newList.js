import {finishedTasks} from "./finishedTasks.js";

export const newList = {

    categoryId : null,
    btnValidate : null,
    btnAddList: null,
    btnTaskList: null,
    btnNewTask: null,
    containerTaskList: null,
    newList: null,
    listName: null,
    taskName:null,

    init :function(){
        newList.containerTaskList = document.querySelector(".task-list");

        const btns = document.querySelectorAll(".add-list");
        for (const btn of btns) {
            btn.addEventListener("click", newList.handleClick);
        }
        newList.btnTaskList= document.querySelector(".to-task-list");
        newList.btnTaskList.addEventListener("click", newList.handleClickTaskList);

        newList.btnValidate= document.querySelector("#checklist-validate");
        newList.btnValidate.addEventListener("click", () => {
            newList.btnValidate.hidden = true;
        });

        newList.btnNewTask= document.querySelectorAll(".add-new-task");
        newList.btnNewTask.forEach(btn => {
            btn.addEventListener("click", newList.handleClickAddTask);
        });
        
        newList.listName = document.querySelector("#list-name");
        newList.listName.addEventListener('input', () => {
            const value = newList.listName.value.trim();
            if(value.length >= 3){
                newList.btnTaskList.disabled = false;
            } else {
                newList.btnTaskList.disabled = true;
            }
        })
        
    },

    handleClick : function(event){

        const btnId = event.currentTarget.id;
        newList.categoryId = btnId.slice(9)
    
    },

    handleClickTaskList: function(){

        newList.taskName = document.querySelector("#task-name");
        newList.taskName.addEventListener('input', () => {
            const value = newList.taskName.value.trim();
            if(value.length >= 3){
                newList.btnNewTask.forEach(btn => {
                    btn.disabled = false;
                });
            } else {
                btn.disabled = true;
            }
        })
            if(newList.newList === null){
            
                const listToAdd = {
                    name: newList.listName.value,
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
            newList.btnValidate.hidden=false;
        }
    }
}