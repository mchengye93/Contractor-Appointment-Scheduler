//const todosController = require('../controllers').todos;
//const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const noteItemsController = require('../controllers').noteItems;
const dateItemsController = require('../controllers').dateItems;
const appointmentController = require('../controllers').appointment;

const rateController = require('../controllers').rates;
const paymentController = require('../controllers').payments;

//stripe
const cors = require('cors');
const bodyParser = require('body-parser');
const CORS_WHITELIST = require('../constants/frontend');
const paymentApi = require('./payment');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

module.exports = (app) => {
//stripe payment
  app.use(cors());
  app.use(bodyParser.json());
  paymentApi(app);


  app.get('/', (req, res) => res.sendFile(`../view/index.html`));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the NOTE SYSTEM API!',
  }));


  app.post('/api/users', usersController.create);//create user
  app.post('/api/users/check', usersController.check);//check user pwd
  app.get('/api/users/:userid', usersController.retrieve);//get user info
  app.get('/api/users/search/:category/:gender/:price/:location', usersController.search);//get user info

  //if I uncommemnt above it retrieve it wont work...

  app.post('/api/users/:userid', usersController.update);//update user
  app.post('/api/users/pwd/:userid', usersController.updatePwd);//update pwd
  app.get('/api/users/getallusers/:role', usersController.getallusers);//get all users

  app.post('/api/notes/:userid', noteItemsController.create);//create note
  app.post('/api/notes/:userid/items/:noteid', noteItemsController.update);//update note
  app.get('/api/notes/:userid/items/:noteid', noteItemsController.destroy);//delete note

  app.post('/api/dates/:userid', dateItemsController.create);//create date
  app.post('/api/dates/:userid/items/:dateid', dateItemsController.update);//update date
  app.post('/api/dates/client/:clientid/items/:dateid', dateItemsController.updateClient);//update date

  app.post('/api/paid/:dateId', dateItemsController.updatePaid);//update date isPaid to true
  app.post('/api/dates/userGotRated/:dateId/:userGotRated', dateItemsController.updateUserRate);
  app.post('/api/dates/clientGotRated/:dateId/:clientGotRated', dateItemsController.updateClientRate);

  app.get('/api/dates/client/:clientid/items/:dateid', dateItemsController.updateUserDate);//update date
  app.get('/api/dates/items', dateItemsController.retrieve);//get user info
  app.get('/api/dates/:userid/items/:dateid', dateItemsController.destroy);//delete date

  app.post('/api/mail/:email', dateItemsController.postEmail);//postemail

  app.post('/api/appointment', appointmentController.create);//create appointment
  // app.post('/api/appointment/:clientid/items/:clientid', appointmentController.update);//update appointment
  // app.post('/api/appointment/items', appointmentController.retrieve);//post user info
  //
  // app.get('/api/appointment/:clientid', appointmentController.retrieve);//get client info
  // app.get('/api/appointment/:clientid/items/:appointmentid', appointmentController.destroy);//delete appointment

  app.get('/api/rate/retrieve/:userId', rateController.retrieve);
  app.post('/api/rate/:rating/:dateId/:fromUserId/:toUserId/:review', rateController.create);
  app.get('/api/rate/average/:toUserId', rateController.average);

  app.get('/api/payment/retrieve', paymentController.retrieve);
  app.post('/api/payment/:paymentId/:dateId/:fromUserId/:toUserId/:time/:amount/:description', paymentController.create);

};
