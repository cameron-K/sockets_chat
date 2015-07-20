var express=require('express');
// var bodyParser=require('body-parser');
var path=require('path');
var app=express();
var messages=[];
// app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname,'./static')));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');


app.get('/',function(req,res){
	res.render('index');
})

var server=app.listen(8000,function(){
	console.log("listening, 8000");
})

var io = require('socket.io').listen(server)  // notice we pass the server object<br>


io.sockets.on('connection', function (socket) {
  // console.log("WE ARE USING SOCKETS!");
  // console.log(socket.id);

	socket.on('new_user',function(name){
		var name={
			message:"Welcome new user - "+name,
			name:"SERVER"
		}
		messages.push(name);
		io.emit('update_chat',messages);
	})

	socket.on('new_message',function(message){
		messages.push(message);
		io.emit('update_chat',messages);
	})

	socket.on('user_disconnected',function(message){
		messages.push(message);
		io.emit('update_chat',messages);
	})


// 	socket.on("button_push", function (){
// 		count++;
// 	    io.emit('update', count);
// 	    // socket.emit('random_number',random);
// 	})

// 	socket.on('reset',function(){
// 		count=0;
// 		io.emit('reset',count);
// 	})
})