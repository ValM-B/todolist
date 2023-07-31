import { newList } from "./newList.js";
import {finishedTasks} from "./finishedTasks.js";
import { categoriesList } from "./categoriesList.js";
import { addCategory } from "./addCategory.js";
import { deleteCategory } from "./deleteCategory.js";
import { deleteChecklist } from "./deleteChecklist.js";

const app = {

    init : function(){
    categoriesList.init();
    addCategory.init();
    finishedTasks.init();
    deleteCategory.init();
    newList.init();
    deleteChecklist.init();

    }
}

document.addEventListener("DOMContentLoaded", app.init);

/**
 * les checkboxs de la derniere catégory ne se rayent pas quand on les checked
 * 
 * une catégorie ne se surrpime pas en db si on la supprime.
 * 
 * les bouton supprimer liste ne disparait pas si on dechecke une tache
 */