
export const vTooltip = {
  mounted(el, content_) {

    const content = content_.value ?? content_
    const showdelay = 2000
    let tooltip_open_timeout; // clear this timeout every time the hover is leaved 

    el?.addEventListener('mouseover',(evt)=>{

      // since we are removing  the las opened tool tip form the DOM (it is just with 'close class') re open it with new content and screen positions
      if(document.querySelector('#da-tooltip')){
        const last_opend_tooltip = document.querySelector('#da-tooltip')
        last_opend_tooltip.innerText = null
        last_opend_tooltip.style.top = evt.pageY + 'px'
        last_opend_tooltip.style.left =  evt.pageX + 'px'
        last_opend_tooltip.classList.remove('open')
        // show the tooltip  with delay cus client must hove for a bit if they want to see the tooltip 
        tooltip_open_timeout = setTimeout(() => {
          last_opend_tooltip.innerText = content
          last_opend_tooltip.classList.add('open')
        }, showdelay);
      } 
      else{
        // if the tooltip was create for the first time then create el and append it the the body child
        const tooltip = document.createElement('span');
        tooltip.id = 'da-tooltip'
        tooltip.innerText = content
        tooltip.style.top =  evt.pageY + 'px'
        tooltip.style.left =  evt.pageX + 'px'
        document.body.appendChild(tooltip) 
        // show the tooltip  with delay cus client must hover for a bit if they want to see a tooltip 
        tooltip_open_timeout =  setTimeout(() => {
          tooltip.classList.add('open')
        }, showdelay);
      }
      

      // update the position while mouse moving over opened tooltip 
      el?.addEventListener('mousemove',(ev)=>{
        const tooltip = document.querySelector('#da-tooltip')
        if(tooltip){
          tooltip.style.top =  ev.pageY + 'px'
          tooltip.style.left =  (ev.pageX + 10) + 'px'
        }
      })

    })

    el?.addEventListener('mouseleave',()=>{
      const tooltip = document.querySelector('#da-tooltip')
      // reset the values we need
      clearTimeout( tooltip_open_timeout )
      tooltip.innerText = null
      tooltip.classList.remove('open') // close it immedatly if hovered away with out any transition it may create a glitch
      // No need to remove it from The DOM 
    })
  },
};