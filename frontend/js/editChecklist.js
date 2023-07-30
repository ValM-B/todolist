import { checklistList } from "./checklistList.js";

export const editChecklist = {

    formEdit : null,
    overlay: null,
    containerChecklist: null,
    checklist: null,
    checklistId:  null,
/** TODO à terminer : 
 * 
 * ajouter un bouton d'ajout de tache
*/

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
        
    },

    handleClick: function(event){
        editChecklist.formEdit.hidden=false;
        editChecklist.overlay.hidden=false;
        editChecklist.containerChecklist = event.currentTarget.parentNode
        console.log(event.currentTarget.parentNode);
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

    initForm: function(){

        editChecklist.getTask()
            .then(data => {
                editChecklist.checklist = data;
                document.querySelector("#list-name-edit").value = data.name;
                const taskList = document.querySelector(".task-list-edit");
                data.tasks.forEach(task => {
                    const newLi = document.createElement("li");
                    newLi.textContent = task.name;
                    newLi.id="edit-task-"+task.id;
                    const btn = document.createElement("button");
                    btn.classList.add("btn", "btn-close");
                    btn.id = "btn-delete-task-"+
                    newLi.append(btn);
                    taskList.append(newLi);
                    btn.addEventListener("click", () => {
                        editChecklist.handleClickDelete(task.id, newLi);
                    });
                });
            })
    },

    getTask: async function(){
        const response = await fetch(`http://127.0.0.1:8000/api/checklists/${editChecklist.checklistId}`);
        return await response.json();
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
    }
}