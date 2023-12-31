import { checklistList } from "./checklistList.js";
import { addChecklist} from "./addChecklist.js";
export const categoriesList ={

    container : null,

    init: function(){
        
        categoriesList.container = document.querySelector(".categories_list");
        categoriesList.getData()
            .then(data => {
                data.forEach(category => {
                
                    categoriesList.addToCategoriesList(category);
                });
                checklistList.init();
            })
            .catch(error => {
				return error;
			})
    },

    getData: async function(){
        
        const response = await fetch("http://127.0.0.1:8000/api/categories");
        return await response.json();
    },

    addToCategoriesList: function(category){

        const newCol = document.createElement("div");
        newCol.classList.add("col-md-3", "col-category", "categ-id-"+category.id);
        categoriesList.container.append(newCol);

        const btnCateg = document.createElement("button");
        btnCateg.classList.add("btn", "btn-primary", "add-list");
        btnCateg.setAttribute("data-bs-target", "#listModalToggle");
        btnCateg.setAttribute("data-bs-toggle","modal");
        btnCateg.id = "categ-id-"+category.id;
        btnCateg.textContent =category.name;
        newCol.append(btnCateg);

        const btnIcon = document.createElement("i");
        btnIcon.classList.add ("fa-solid", category.picture);
        btnCateg.prepend(btnIcon);
        addChecklist.init();
        
     
    }

}