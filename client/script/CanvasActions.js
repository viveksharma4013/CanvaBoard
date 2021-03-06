let canvas=document.querySelector('canvas');
let colors=document.querySelectorAll('.color-container_box');
let undo=document.querySelector('#undo');
let redo=document.querySelector('#redo');
let clear_icon=document.querySelector('#clear');

let selectedColor='black';
let tool=canvas.getContext('2d');
let drawing=false;
let eraserActive=false;
let pencil_width=3;
let eraser_width=3;
let imgData=[];
let currImage=0;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
tool.strokeStyle=selectedColor;
tool.lineWidth=pencil_width;

const selectColors=function(){
    colors.forEach((color)=>{
        color.addEventListener('click',()=>{
            selectedColor=color.classList[1];
            tool.strokeStyle=selectedColor;
        })
    })
}
// change width of pencil using this function

function pencilWidthChange(value){
    pencil_width=value;
    tool.lineWidth=pencil_width;
}
function eraserWidthChange(value){
    eraser_width=value;
    tool.lineWidth=value;
}
function loadImage(){
    let url=imgData[currImage];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
}
const beginPath=function(coordinates){
    drawing=true;
    tool.beginPath();
    tool.moveTo(coordinates.x,coordinates.y);
}
const eraseContent=function(coordinates){
    if(!eraserActive){
        tool.strokeStyle="white"
        tool.lineWidth=eraser_width;
    }else{
        tool.strokeStyle=selectedColor;
        tool.lineWidth=pencil_width;
    }
    eraserActive=!eraserActive;
}
const draw=function(coordinates){
    if(drawing){
        tool.lineTo(coordinates.x,coordinates.y);
        tool.stroke();
    }
}
const endDraw=function(){
    drawing=false;
    let url=canvas.toDataURL();
    imgData.push(url);
    currImage=imgData.length-1;
}

selectColors();
canvas.addEventListener('mousedown',(e)=>{
    let data={x:e.clientX,y:e.clientY};
    beginPath(data);
    socket.emit("startDraw",data);
})
canvas.addEventListener('mousemove',(e)=>{
    let data={x:e.clientX,y:e.clientY};
    draw(data);
    if(drawing) socket.emit("drawing",data);
})
canvas.addEventListener('mouseup',(e)=>{
    endDraw();
    socket.emit("endDrawing");
})

eraser_icon.addEventListener('click',()=>{
    eraseContent();
    socket.emit("eraseContent");
})

undo.addEventListener('click',()=>{
    if(currImage>0) currImage--;
    loadImage();
})
redo.addEventListener('click',()=>{
    if(currImage<imgData.length) currImage++;
    loadImage();
})

clear_icon.addEventListener('click',()=>{
    tool.clearRect(0,0,canvas.width,canvas.height)
    socket.emit("clearCanvas");
})


socket.on('startDraw',(data)=>{
    beginPath(data)
})
socket.on('drawing',(data)=>{
    draw(data);
})
socket.on('endDrawing',()=>{
    endDraw();
})
socket.on('eraseContent',()=>{
    eraseContent();
})
socket.on('clearCanvas',()=>{
    tool.clearRect(0,0,canvas.width,canvas.height);
})