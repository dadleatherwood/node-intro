var messages = require('./messages')

module.exports = {
  getMessages: function(req,res){
    var session = req.session;
    if(session.views){
      session.views++
      res.json(session.views)
    } else {
      session.views = 1;
      res.json(session.views)
    }
    // res.send(messages)
  },
  postMessages: function(req,res){
    console.log('this is the post endpoint')
    var message = req.body
    messages.push(message)
    res.json(messages)
  },
  getMessage: function(req,res){
    var id = req.params.id
    var message = messages.find(function(message){
      return message.id == id
    })
    res.json(message)
  },
  getByCategory: function(req,res){
    var category = req.query.category
    var filtered = messages.filter(function(message){
      return message.category == category
    })
    res.json(filtered)
  }
}
