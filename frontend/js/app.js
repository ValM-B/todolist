import { newList } from "./newList.js";
import {finishedTasks} from "./finishedTasks.js";
import { categoriesList } from "./categoriesList.js";
import { addCategory } from "./addCategory.js";
import { deleteCategory } from "./deleteCategory.js";

const app = {

    init : function(){
    categoriesList.init();
    addCategory.init();
    finishedTasks.init();
    deleteCategory.init();
    newList.init();

    }
}

document.addEventListener("DOMContentLoaded", app.init);