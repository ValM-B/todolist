import { categoriesList } from "./categoriesList.js";

export const addCategory ={

    btnAddCategory: null,
    newCategory: null,

    init: function(){
        addCategory.btnAddCategory = document.querySelector(".add-category");
        
        addCategory.btnAddCategory.addEventListener("click", addCategory.handleClick);
    },

    handleClick: function(){
        addCategory.newCategory = {
            name: document.getElementById("category-name").value,
            picture: document.getElementById("category-picture").value
        };
        document.getElementById("category-name").value = "";
        document.getElementById("category-picture").value = "";
        addCategory.addCategory(addCategory.newCategory);
    },

    addCategory: async function(newCategory){
        
        fetch('http://127.0.0.1:8000/api/categories',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => response.json())
        
        .then(data => {
            
            if(data.status === "success"){
                const success = document.querySelector(".add-category-success")
                success.hidden = false;
                setTimeout(() => {success.hidden = true;}, 5000);
                categoriesList.addToCategoriesList(data.category);
            }
            
        })
    }
}