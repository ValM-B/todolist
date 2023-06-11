export const newList = {
    init :function(){
        newList.btns = document.querySelectorAll("button");

    console.log(newList.btns);


        for (const btn of btns) {
            btn.addEventListener("click", newList.handleClick);
        }
    },

    handleClick : function(event){
        const btnId = newList.btns.event.currentTarget.id;
        const container = document.querySelector(`.col__${btnId}`)
        newList.newDiv = document.createElement("div");
        newList.newDiv.classList.add("col__item");
        const titleList = document.createElement("h2");
        titleList.textContent = prompt("Entrer le nom de la liste");
        newList.newDiv.append(titleList);
        container.append(newList.newDiv);

    }
}