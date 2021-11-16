var menu=document.getElementsByClassName("menu");
var tools=document.getElementById("tools");
var pencil_icon=document.getElementById("pencil-icon");
var color_selector=document.getElementById("color-container");
var menuClosed=true;
var pencil_select_closed=true;
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
    }else{
        color_selector.className="hidden";
    }
    pencil_select_closed=!pencil_select_closed;
}
