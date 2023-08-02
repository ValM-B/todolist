import { checklistList } from "./checklistList.js";
import { deleteChecklist } from "./deleteChecklist.js";


export const finishedList = {

	init : function(){
		const buttons = document.querySelectorAll(".btn-delete-checklist");
		console.log(buttons);
		for (const button of buttons) {
			button.addEventListener("click", finishedList.handleclick)
			
		}
	},

	handleclick : function(event){
		const checklistIdToDelete = event.currentTarget.parentNode.id.slice(14)
		
		checklistList.getDataChecklist(checklistIdToDelete)
		.then(data => {
			deleteChecklist.deleteChecklist(data);
		})
		const div = event.currentTarget.parentNode;
		const canvas = document.querySelector('#confetti-canvas');
		div.remove();
		const myConfetti = confetti.create(canvas, {
			resize: true,
			useWorker: true
		});
		myConfetti({
			particleCount: 110,
			spread: 110,
			origin: { y:0.5, x: 0.5}
		});
		
	},


}
