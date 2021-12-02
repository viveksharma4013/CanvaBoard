const express=require('express');
const socket=require('socket.io');
const app=express();
const port= process.env.port|| 5500;
app.use(express.static('client'));
const server=app.listen(port,()=>{
    console.log("Listening at ",port);
});
const io=socket(server);

io.on('connection',(socket)=>{
    console.log('socket connected');
    socket.on('startDraw',(data)=>{
        socket.broadcast.emit('startDraw',data)
    })
    socket.on('drawing',(data)=>{
        socket.broadcast.emit('drawing',data)
    })
    socket.on('endDrawing',()=>{
        socket.broadcast.emit('endDrawing')
    })
    socket.on('eraseContent',()=>{
        socket.broadcast.emit('eraseContent')
    })
})