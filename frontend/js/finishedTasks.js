import {finishedList} from "./finishedList.js";

export const finishedTasks = {

	init : function(){
		const checkboxs = document.querySelectorAll("input");
		
		for (const checkbox of checkboxs) {
			checkbox.addEventListener("change", finishedTasks.handleChange);
		}
		

	},

	handleChange : function(event){
		finishedTasks.checkbox = document.getElementById(event.currentTarget.id);
		const label = document.getElementById(`${finishedTasks.checkbox.id}_label`)
		if(event.currentTarget.checked){
			
			label.className ="checked";
		} else {
			label.className = "";
		}

		finishedTasks.parentUl = finishedTasks.checkbox.parentNode.parentNode;
		const inputs = finishedTasks.parentUl.querySelectorAll("input");
		let allInputsChecked = true;

		for (const input of inputs) {
			if(!input.checked){
				allInputsChecked = false;
			}
		}
		console.log(allInputsChecked);
		
		if(allInputsChecked){
			finishedTasks.addBtn()
		}
		
				
	},

	addBtn : function(){
		finishedTasks.parentDiv = finishedTasks.parentUl.parentNode;
		const btnFinishedList = document.createElement("button");
		const canvas = document.createElement("canvas")
		canvas.classList.add("confetti-canvas")
		btnFinishedList.classList.add("btn_remove");
		btnFinishedList.textContent = "Supprimer la liste";
		finishedTasks.parentDiv.append(btnFinishedList, canvas);
		finishedList.init();
	}

}