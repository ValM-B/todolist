import { addChecklist} from "./addChecklist.js";
import {finishedTasks} from "./finishedTasks.js";
import { categoriesList } from "./categoriesList.js";
import { addCategory } from "./addCategory.js";
import { deleteCategory } from "./deleteCategory.js";
import { deleteChecklist } from "./deleteChecklist.js";

const app = {

    init : function(){
    categoriesList.init();
    addCategory.init();
    deleteCategory.init();
    addChecklist.init();
    deleteChecklist.init();

    }
}

document.addEventListener("DOMContentLoaded", app.init);

/**
 * voir si je peux duppliquer un model de chekclist plutot que creer et ajouter le bouton de suppression en hidden des le deparp - ok
 * modifier lapparition et disparition du bouton lorsque les checkbox sont cochées
 * 
 * vérifier fonctionnement appliphp 
 * 
 * 
 * 
 * les bouton supprimer liste ne disparait pas si on dechecke une tache
 */