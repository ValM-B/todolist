import { editChecklist } from "./editChecklist.js";

export const deleteChecklist = {

    successMessage: null,
    echecMessage: null,

    init : function(){
        deleteChecklist.successMessage = document.querySelector(".success-delete");
        
        deleteChecklist.echecMessage = document.querySelector("echec-delete");
    },

    deleteChecklist: function(checklist){


        deleteChecklist.deleteChecklistinDB(checklist)
        .then(() => {
            deleteChecklist.successMessage.hidden = false;
            setTimeout(function(){
                deleteChecklist.successMessage.hidden = true;
            }, 3000);
            
        })
    },

    deleteChecklistinDB: async function(checklist){
        await fetch(`http://127.0.0.1:8000/api/checklists/${checklist.id}`, {method: 'DELETE'})
    }
}