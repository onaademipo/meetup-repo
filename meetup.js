import express from 'express';
import bodyParser from 'body-parser';


const app = express();

//Data structure as db
let db = [];
let questions_db = [];
let rsvp_db = [];


//Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//..................MEETUP SECTION...................


//To get all meetups
app.get('/api/v1/meetups', (request, response) => {
  response.status(200).send({
    "status": 200,
    "data": db
  });
});


//Get upcoming meetups
app.get('/api/v1/meetups/upcoming', (request, response) => {
  //const now = new Date();
  let upcoming_meetup = [];
  db.map((upcoming) => {
    if (new Date(upcoming.happeningOn) > new Date()){
      upcoming_meetup.push(upcoming);
    }
  });

  (upcoming_meetup)?

    response.status(200).send({
     "status": 200,
      "data": upcoming_meetup
    }):

    response.status(400).send({
      "status": 400,
      "error": "No upcoming meetup"
    });
    
});
  

//Obtain a single meetup
app.get('/api/v1/meetups/:meetup_id', (request, response) =>{ 
  const id = parseInt(request.params.meetup_id, 10);
  db.map((meetup) => {
    if (meetup.id === id) {
      return response.status(200).send({
        status: 200,
        data: meetup
      });
    }
  });

  return response.status(400).send({
    status: 400,
    error: 'No such meetup'
  });

});

//Post for a given meetup
//let meetups = { data:[] };
app.post('/api/v1/meetups', (request, response) => {
 
//Throw error when location, happeningOn and(or) topic field is empty
if (!request.body.location) {
   return response.status(400).send({
    status: 400,
    error: 'location is required'
  });} 
if (!request.body.happeningOn) {
   return response.status(400).send({
    status: 400,
    error: 'date for meetup is required'
  });}
if (!request.body.topic) {
   return response.status(400).send({
    status: 400,
    error: 'meetup topic is required'
  });}

//Assign the entered value to meetup object
const meetup = {
  id: db.length + 1,
  createdOn: request.body.createdOn,
  topic: request.body.topic,
  location: request.body.location,
  happeningOn: request.body.happeningOn,
  tags: request.body.tags.split(",")
};

///Push the entered fields to the db
db.push(meetup);
 
//Return on success
return response.status(200).send({
  status: 200,
  message: 'meetup post was successful'
});

});


//RSVP response to meetup


//To get all rsvp
app.get('/api/v1/rsvps', (request, response) => {
  response.status(200).send({
    "status": 200,
    "data": rsvp_db
  });
});

app.post('/api/v1/meetups/:meetup_id/rsvp', (request, response) => {
  const id = parseInt(request.params.meetup_id, 10);

//Throw error when status field is empty
if (!request.body.status) {
  return response.status(400).send({
    status: 400,
    error: 'status is required'
  });
}

//Assign the entered value to rsvp object
const rsvp = {
  meetup: id,
  topic: request.body.topic,
  status: request.body.status
};

///Push the entered fields to the rsvp_db
rsvp_db.push(rsvp);
 
//Return on success
return response.status(200).send({
  status: 200,
  message: 'rsvp post was successful'
});

});


//.................QUESTIONS SECTION...................

//Get all questions
app.get('/api/v1/questions', (request, response) => {
  response.status(200).send({
    "status": 200,
    "questions": questions_db
  });
});

//Post a question
app.post('/api/v1/questions', (request, response) => {

//Throw error when title and(or) body field is empty
if (!request.body.title) {
  return response.status(400).send({
    status: 400,
    error: 'title is required'
  });}
if (!request.body.body) {
   return response.status(400).send({
    status: 400,
    error: 'add some details to the question'
  });}

//Assign the entered value to todo object
const question = {
  user: request.body.user,
  meetup: request.body.meetup,
  title: request.body.title,
  body: request.body.body,
  upvote: 0,
  downvote: 0
};

//Push the entered fields to question_db
questions_db.push(question);
 
//Return on success
return response.status(200).send({
  status: 200,
  message: 'post was successful'});
});


const PORT = 8888;
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));