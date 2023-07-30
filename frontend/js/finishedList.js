

export const finishedList = {

	init : function(){
		const buttons = document.querySelectorAll(".btn_remove");
		
		for (const button of buttons) {
			button.addEventListener("click", finishedList.handleclick)
			
		}
	},

	handleclick : function(event){
		const xMouse = (event.clientX)/1000
		const yMouse = (event.clientY)/1000 
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
  			origin: { y:yMouse, x: xMouse}
		});
		
	},


}
