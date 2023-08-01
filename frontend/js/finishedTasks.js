import {finishedList} from "./finishedList.js";

export const finishedTasks = {
	parentUl: null,


	handleChange : function(event){
		let allInputsChecked = true;
		console.log("ok");
		const checkbox = event.currentTarget;
		
		const label = document.getElementById(`${checkbox.id}-label`)
		
		if(checkbox.checked){
			
			label.classList.add ("checked");
		} else {
			label.classList.remove("checked");
			

		}

		finishedTasks.parentUl = checkbox.parentNode.parentNode;
		const inputs = finishedTasks.parentUl.querySelectorAll("input");
		

		for (const input of inputs) {
			if(!input.checked){
				allInputsChecked = false;
				
			}
		}
		
		
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
		document.querySelector(".btn_remove").hidden = false;
		finishedList.init();
	}

}