const container = document.querySelector(`.container`)
const containerProgress = document.querySelector(`.progress-container`)
const countSteps = 3;
let activeSteps = 1

const addHTML = function(numSteps){
   let result = []
   let currStep = 0
   while(currStep < numSteps){
      currStep++
      result.push(`<div data-step = ${currStep} class="circle ${currStep == activeSteps ? `active` : ``}">${currStep}</div>`)
   }
   return result
}

const generateCircles = function(){
   const circles = document.querySelectorAll(`.circle`)
   const html = addHTML(countSteps)
   circles.forEach(el => el.remove())
   containerProgress.insertAdjacentHTML(`beforeend`, html)
}

const updateBtn = function(e) {
   e.preventDefault();
   const btn = e.target.closest(`.btn`);
   if (!btn) return;

   const circles = Array.from(this.querySelectorAll(`.circle`));
   const active = circles.filter(el => el.closest(`.active`));
   activeSteps = active.length;

   if (btn.closest(`.btn-next`)) {
      if (activeSteps < circles.length) {
         circles[activeSteps].classList.add(`active`);
         activeSteps++;
      }
      console.log(`next`);
   }

   if (btn.closest(`.btn-prev`)) {
      if (activeSteps > 1) { // Ensure activeSteps doesn't go below 1
         const deleteActive = document.querySelector(`[data-step="${activeSteps}"]`);
         deleteActive.classList.remove(`active`);
         activeSteps--; // Decrement activeSteps when clicking "Prev"
      }
      console.log(`prev`);
   }
   const progress = (((activeSteps) - 1) / (circles.length - 1)) * 100;
   document.querySelector(`.progress`).style.width = progress + `%`;
   console.log(`Progress: ${progress}%`);
};

const init = function(){
   generateCircles()
   container.addEventListener(`click`,updateBtn)
}
init()



