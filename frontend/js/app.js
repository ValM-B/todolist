import { newList } from "./newList.js";
import {finishedTasks} from "./finishedTasks.js";
import { categoriesList } from "./categoriesList.js";

const app = {
   
    init : function(){
    categoriesList.init();
    newList.init();
    finishedTasks.init();

    }
}

document.addEventListener("DOMContentLoaded", app.init);