var express = require('express');
var bodyParser = require('body-parser')
var messagesCtrl = require('./controllers')
var messages = require('./messages')
var session = require('express-session')
var cors = require('cors')
var app = express();




//app.use(function(req,res,next))
app.use(cors())
app.use(session({
  secret: 'devmountain',
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//makes static things available
app.use(express.static('public'))

//'use' function to be used for specific purposes instead of ALL cases
var addMessageID = function(req,res,next){
  console.log('this is the middleware');
  var id = messages.length;
  req.body.id = id
  req.body.category = id % 2 == 0 ? 'even' : 'odd'
  next();
}




//app.get(endpoint, callback)
app.get('/messages', messagesCtrl.getMessages)

//called 'addMessageID' by putting it between the name and function
app.post('/messages', addMessageID, messagesCtrl.postMessages)

app.get('/messages/:id', messagesCtrl.getMessage)
app.get('/getMessageByCategory',messagesCtrl.getByCategory)


app.listen(3000, function(){
  console.log('Example app listening on port 3000')
})
