// Elements
var menu=document.getElementsByClassName("menu");
var tools=document.getElementById("tools");
var pencil_icon=document.getElementById("pencil-icon");
var eraser_icon=document.getElementById("eraser-icon");
var sticy_note_icon=document.getElementById("sticy_note-icon");
var upload_icon=document.getElementById("upload-icon");
var download_icon=document.getElementById("download-icon");
var color_selector=document.getElementById("color-container");
var pencil_width_setter=document.getElementsByClassName("pencil-container__width")[0]
var eraser_width_setter=document.getElementsByClassName("eraser-container__width")[0]

// varibales
var menuClosed=true;
var pencil_select_closed=true;
var eraser_select_closed=true;
// open tools with menu button
menu[0].onclick=function(e){
    if(menuClosed){
        tools.className="tools";
    }else{
        tools.className="hidden";
    }
    menuClosed=!menuClosed;
}
pencil_icon.onclick=function(e){
    if(pencil_select_closed){
        color_selector.className="color-container";
        pencil_width_setter.classList.remove("hidden")
    }else{
        color_selector.className="hidden";
        pencil_width_setter.classList.add("hidden")
    }
    pencil_select_closed=!pencil_select_closed;
}
eraser_icon.onclick=function(e){
    if(eraser_select_closed){
        eraser_width_setter.classList.remove("hidden")
    }else{
        eraser_width_setter.classList.add("hidden")
    }
    eraser_select_closed=!eraser_select_closed;
}

// create new stickynote
sticy_note_icon.addEventListener('click',()=>{
    createSticky();
});
upload_icon.addEventListener('click',()=>{
    let el=document.createElement('input');
    el.setAttribute('type','file');
    el.click();
    el.addEventListener('change',()=>{
        let file=el.files[0];
        let url=URL.createObjectURL(file);
        createStickyWithImage(url);
    })
});

download_icon.addEventListener('click',(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement('a');
    a.href=url;
    a.download='board.jpg';
    a.click();
})