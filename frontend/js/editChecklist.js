import { checklistList } from "./checklistList.js";
import { newList } from "./newList.js";

export const editChecklist = {

    formEdit : null,
    overlay: null,
    containerChecklist: null,
    checklist: null,
    checklistId:  null,

    init: function(){
    
        editChecklist.formEdit = document.querySelector(".form-edit");
        editChecklist.overlay = document.querySelector(".overlay");
        editChecklist.overlay.addEventListener("click", event=>{
            event.stopPropagation();
        });

        const btnClose = document.querySelector(".form-edit .btn-close");
        btnClose.addEventListener("click", editChecklist.handleClickClose);

        const btnEdit = document.querySelectorAll(".btn-edit");
        btnEdit.forEach(btn => {
            btn.addEventListener("click", editChecklist.handleClick)
        });

        const btnUpdate = document.querySelector(".btn-checklist-edit");
        btnUpdate.addEventListener("click", editChecklist.handleClickUpdate);

        const btnAddTask = document.querySelector(".form-edit .add-task");
        btnAddTask.addEventListener("click", editChecklist.handleClickAddTask);
        
    },

    handleClick: function(event){
        editChecklist.formEdit.hidden=false;
        editChecklist.overlay.hidden=false;
        editChecklist.containerChecklist = event.currentTarget.parentNode
        editChecklist.checklistId = editChecklist.containerChecklist.id.slice(14);
        editChecklist.initForm();

    },

    handleClickClose: function(){
        editChecklist.formEdit.hidden=true;
        editChecklist.overlay.hidden=true;
        checklistList.addToChecklistList(editChecklist.checklist, editChecklist.containerChecklist.parentNode);
        editChecklist.containerChecklist.remove();
        
        
    },

    handleClickUpdate: function(){
        
        const newTask = {
            name: document.querySelector("#list-name-edit").value
        };
        editChecklist.updateChecklist(editChecklist.checklist.id, newTask)
        .then(data => {
            if(data.status === "success"){
                editChecklist.checklist = data.checklist;
                editChecklist.handleClickClose();
            }
        })
    },

    handleClickAddTask: function(){
        
        document.querySelector(".form-edit-task").hidden = false;
        editChecklist.formEdit.hidden = true;

        const btnSave = document.querySelector(".form-edit-task .btn-checklist-edit");
        btnSave.addEventListener("click", editChecklist.addTask);
    },

    initForm: function(){

        editChecklist.getTask()
            .then(data => {
                editChecklist.checklist = data;
                document.querySelector("#list-name-edit").value = data.name;
                
                data.tasks.forEach(task => {
                    editChecklist.displayTasks(task);
                    });
                });
            
    },

    getTask: async function(){
        const response = await fetch(`http://127.0.0.1:8000/api/checklists/${editChecklist.checklistId}`);
        return await response.json();
    },

    displayTasks: function(task){
        console.log(task);
        const newLi = document.createElement("li");
        newLi.textContent = task.name;
        newLi.id="edit-task-"+task.id;
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-close");
        btn.id = "btn-delete-task-"+
        newLi.append(btn);
        document.querySelector(".task-list-edit").append(newLi);
        btn.addEventListener("click", () => {
            editChecklist.handleClickDelete(task.id, newLi);
        });
    },

    handleClickDelete: function(taskId, taskLi){
        if(confirm("Voulez-vous supprimer la tâche ?")){
            
            editChecklist.deleteTask(taskId)
            .then(()=>{
                taskLi.remove();
            }).catch(() => {
                alert('La suppression a échoué');
            })
        }
    },

    deleteTask: async function(taskId){

        await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {method: 'DELETE'})

    },
    
    updateChecklist: async function(checklistId, checklist){
        const response = await fetch(`http://127.0.0.1:8000/api/checklists/${checklistId}`, {
            method: 'PATCH',
            headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(checklist)
        });

        return await response.json();
    },

    addTask : async function(){
        const taskName = document.querySelector(".form-edit-task input").value;
        document.querySelector(".form-edit-task").hidden = true;
        editChecklist.formEdit.hidden = false;

        const taskToAdd = {
            name: taskName,
            checklist_id: editChecklist.checklistId
        }
        const response= await newList.addTaskInDB(taskToAdd);
        const data = await response.json();
        if(data.status === "success"){
            editChecklist.displayTasks(data.task);
        }
    }
}