export const finishedTasks = {

	init : function(){
		const checkboxs = document.querySelectorAll("input");
		console.log(checkboxs)
		for (const checkbox of checkboxs) {
			checkbox.addEventListener("change", finishedTasks.handleChange);
		}
		

	},

	handleChange : function(event){
		const checkbox = document.getElementById(event.currentTarget.id);
		console.log(checkbox);
		const label = document.getElementById(`${checkbox.id}_label`)
		if(event.currentTarget.checked){
			
			label.className ="checked";
		}
	

		
	}

}