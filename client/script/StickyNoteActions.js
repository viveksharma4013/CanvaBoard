// drap n drop

function dragNDrop(element,event){

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);
  
    moveAt(event.pageX, event.pageY);
  
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
};

function createSticky(){
  let sticky_container=document.createElement('div');
    sticky_container.setAttribute('class','sticky_container');
    sticky_container.innerHTML=`
    <div class="sticky_container__head">
        <div class="sticky_container__head__minimize"></div>
        <div class="sticky_container__head__close"></div>
    </div>
    <textarea class="sticky_container__text"></textarea>
    `;
    document.body.appendChild(sticky_container);

    let minimize=sticky_container.querySelectorAll('.sticky_container__head__minimize')[0];
    let close=sticky_container.querySelectorAll('.sticky_container__head__close')[0]
    stickyNoteAction(minimize,close,sticky_container);
    sticky_container.onmousedown = function(event) {
        dragNDrop(sticky_container,event);
    }
    sticky_container.ondragstart = function() {
        return false;
    }
}
function createStickyWithImage(imgUrl){
  let sticky_container=document.createElement('div');
    sticky_container.setAttribute('class','sticky_container');
    sticky_container.innerHTML=`
    <div class="sticky_container__head">
        <div class="sticky_container__head__minimize"></div>
        <div class="sticky_container__head__close"></div>
    </div>
      <img src="${imgUrl}"/>
    `;
    document.body.appendChild(sticky_container);

    let minimize=sticky_container.querySelectorAll('.sticky_container__head__minimize')[0];
    let close=sticky_container.querySelectorAll('.sticky_container__head__close')[0]
    stickyNoteAction(minimize,close,sticky_container);
    sticky_container.onmousedown = function(event) {
        dragNDrop(sticky_container,event);
    }
    sticky_container.ondragstart = function() {
        return false;
    }
}



function stickyNoteAction(minimize,close,element){
    close.addEventListener('click',(e)=>{
        element.remove();
    })
    minimize.addEventListener('click',()=>{
        let textArea=element.querySelector('.sticky_container__text');
        let displayProperty=getComputedStyle(textArea).getPropertyValue('display');
        if(displayProperty=="none") textArea.style.display="block";
        else textArea.style.display="none";
    })
}