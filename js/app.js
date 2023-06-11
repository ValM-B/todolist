import { newList } from "./newList.js"

const app = {

    init : function(){
    newList.init();
    console.log("check");
    }
}

document.addEventListener("DOMContentLoaded", app.init);