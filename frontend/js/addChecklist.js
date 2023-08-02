import { checklistList } from "./checklistList.js";
import {finishedTasks} from "./finishedTasks.js";

export const addChecklist = {

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
        addChecklist.containerTaskList = document.querySelector(".task-list");

        const btns = document.querySelectorAll(".add-list");
        for (const btn of btns) {
            btn.addEventListener("click", addChecklist.handleClick);
        }
        addChecklist.btnTaskList= document.querySelector(".to-task-list");
        addChecklist.btnTaskList.addEventListener("click", addChecklist.handleClickTaskList);

        addChecklist.btnValidate= document.querySelector("#checklist-validate");
        addChecklist.btnValidate.addEventListener("click", addChecklist.handleClickValidate);

        addChecklist.btnNewTask= document.querySelectorAll(".add-new-task");
        addChecklist.btnNewTask.forEach(btn => {
            btn.addEventListener("click", addChecklist.handleClickAddTask);
        });
        
        addChecklist.listName = document.querySelector("#list-name");
        addChecklist.listName.addEventListener('input', () => {
            const value = addChecklist.listName.value.trim();
            if(value.length >= 3){
                addChecklist.btnTaskList.disabled = false;
            } else {
                addChecklist.btnTaskList.disabled = true;
            }
        })
        
    },

    handleClickValidate: function(){
        addChecklist.btnValidate.hidden = true;
        const colCategory = document.querySelector(".categ-id-"+addChecklist.categoryId);
        addChecklist.listName.value = "";
        addChecklist.containerTaskList.innerHTML = "";
        addChecklist.newList=null;
        while (colCategory.children.length>1) {
            colCategory.removeChild(colCategory.children[1]);
        }
        checklistList.displayChecklist(colCategory);
        
    },

    handleClick : function(event){

        const btnId = event.currentTarget.id;
        addChecklist.categoryId = btnId.slice(9)
    
    },

    handleClickTaskList: function(){

        addChecklist.taskName = document.querySelector("#task-name");
        addChecklist.taskName.addEventListener('input', () => {
            const value = addChecklist.taskName.value.trim();
            if(value.length >= 3){
                addChecklist.btnNewTask.forEach(btn => {
                    btn.disabled = false;
                });
            } else {
                addChecklist.btnNewTask.forEach(btn => {
                    btn.disabled = true;
                });
            }
        })
            if(addChecklist.newList === null){
            
                const listToAdd = {
                    name: addChecklist.listName.value,
                    category_id: addChecklist.categoryId
                }
                
                addChecklist.addList(listToAdd);
                
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
			addChecklist.newList = data.checklist;
        }
    },

    handleClickAddTask: function(){
        addChecklist.btnNewTask.forEach(btn => {
            btn.disabled = true;
        });
        const taskToAdd = {
            name: document.getElementById("task-name").value,
            checklist_id: addChecklist.newList.id
        }
        addChecklist.addTask(taskToAdd);
        document.getElementById("task-name").value ="";

    },

    addTask: async function(taskToAdd){
        const response= await addChecklist.addTaskInDB(taskToAdd);
        const data = await response.json();
        if(data.status === "success"){
            const newLi = document.createElement("li");
            newLi.textContent = taskToAdd.name;
            addChecklist.containerTaskList.append(newLi);
            document.getElementById("task-name").value ="";
            addChecklist.btnValidate.hidden=false;
        }
    }, 

    addTaskInDB: async function(taskToAdd){
        return await fetch("http://127.0.0.1:8000/api/tasks", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToAdd)
        });
    }
}