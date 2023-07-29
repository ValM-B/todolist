import { categoriesList } from "./categoriesList.js"

export const deleteCategory = {

    deleteForm: null, 
    btnDelete: null,
    init: function (){
        deleteCategory.deleteForm = document.querySelector(".form-select-categories");
        deleteCategory.btnDelete = document.querySelector(".delete-category");
        deleteCategory.btnDelete.addEventListener("click", deleteCategory.handleClick);
        document.querySelector(".btn-form-delete-category").addEventListener("click", deleteCategory.initForm)

    },

    initForm: function(){
        const categories = categoriesList.getData()
            .then(data => {
                
                while(deleteCategory.deleteForm.children.length>1){
                    deleteCategory.deleteForm.removeChild(deleteCategory.deleteForm.children[1])
                }
                data.forEach(category => {
                    const newOption = document.createElement("option");
                    newOption.value = category.id;
                    newOption.textContent = category.name;
                    deleteCategory.deleteForm.append(newOption);
            })});
    },

    handleClick: function(){

        if(confirm("Voulez-vous supprimer la catégorie ?")){
            deleteCategory.deleteCategory(deleteCategory.deleteForm.value)
                .then(() =>
                    document.querySelector(".categ-id-"+deleteCategory.deleteForm.value).remove()
                ).catch(() => {
                    alert('La requête de suppression a echoué !');
                });
        }
        
    },

    deleteCategory: async function(categoryId){
        await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {method:'DELETE'});
    }
}