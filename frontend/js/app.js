import { newList } from "./newList.js";
import {finishedTasks} from "./finishedTasks.js";

const app = {

    init : function(){
    newList.init();
    finishedTasks.init();
    }
}

document.addEventListener("DOMContentLoaded", app.init);