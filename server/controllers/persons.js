var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {
  index: function(req, res) {
    Person.find({}, function(err, persons) {
      persons.unshift({"instructions" : ["Route '/' will serve up the full collection of people.",
                                 "Route '/new/:name/' will add a name into the database. can be used for blank spaces, so adding Steve Jobs to our database, you'd type in the URL 'api.alexw.tech/new/Steve Jobs'.",
                                 "Route '/remove/:name/' will delete a name from the database.",
                                 "Route '/:name' will bring up the document of that particular person."
                                 ]});
      console.log(persons);
      res.json(persons);
    })
  },
  create: function(req, res) {
    var name = req.params.name
    var person = new Person({name: name});
    person.save(function(err) {
      if(err) {
        console.log('something went wrong');
      } else {
        console.log('successfully added a person!');
        res.redirect('/');
      }
    })
  },
  show: function(req, res) {
    console.log(req.params)
    var name = req.params.name
    Person.find({name:name}, function(err, persons) {
      if(err) {
        console.log('something went wrong');
      } else { 
        console.log('successfully got the person!');
        res.json(persons);
      }
    })
  },
  destroy: function(req, res) {
    console.log(req.params)
    var name = req.params.name
    Person.remove({name:name}, function(err) {
      if(err) {
        console.log('something went wrong');
      } else{
        res.redirect("/");
      }
    });
  }
}