import {finishedList} from "./finishedList.js";

export const finishedTasks = {
	parentUl: null,


	handleChange : function(event){
		let allInputsChecked = true;
		
		const checkbox = event.currentTarget;
		
		const label = document.getElementById(`${checkbox.id}-label`)
		
		if(checkbox.checked){
			const taskId = checkbox.id.slice(5);
			const task = {
				status: 0
			};
			finishedTasks.updateTaskStatus(taskId, task)
			.then(data => {
				if(data.status === "success"){
					label.classList.add ("checked");
				}
			})

		} else {
			const taskId = checkbox.id.slice(5);
			const task = {
				status: 1
			};
			finishedTasks.updateTaskStatus(taskId, task)
			.then(data => {
				if(data.status === "success"){
					label.classList.remove("checked");
				}
			})
			
			

		}

		finishedTasks.container = checkbox.closest(".container-checklist");
		const inputs = finishedTasks.container.querySelectorAll("input");
		console.log(finishedTasks.container);

		for (const input of inputs) {
			if(!input.checked){
				allInputsChecked = false;
				
			}
		}
		
		
		if(allInputsChecked){
			finishedTasks.container.querySelector(".btn-delete-checklist").hidden = false;
		finishedTasks.container.querySelector(".confetti-canvas").hidden = false;
		finishedTasks.container.querySelector(".btn-edit").hidden = true;
		
		finishedList.init();
		} else {
			finishedTasks.container.querySelector(".btn-delete-checklist").hidden = true;
			finishedTasks.container.querySelector(".confetti-canvas").hidden = true;
			finishedTasks.container.querySelector(".btn-edit").hidden = false;
		}
		
				
	},

	updateTaskStatus:  async function(taskId, task){
		console.log(taskId, task);
        const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
        });

        return await response.json();
    },

}