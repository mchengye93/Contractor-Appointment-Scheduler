const Payment = require('../models').Payment;
const nodemailer = require('nodemailer');

module.exports = {
  /*create new note*/
  create(req, res) {
    return Payment
    .create({
      paymentId: req.params.paymentId,
      dateId: req.params.dateId,
      fromUserId: req.params.fromUserId,
      toUserId:req.params.toUserId,
      amount: req.params.amount,
      timeStamp: req.params.time,
      description: req.params.description,
    })
    .then((PaymentItem) => {
      if (!PaymentItem) {
        return res.send({
          "code":404,
          "success":"Payment build fail!"
        });
      }
      return res.send({
        "code":200,
        "success":"Payment build success"
      });
    })
    .catch(error => {
      return res.send({
        "code":404,
        "success":"Payment build fail!"
      });
    });
  },
  /*
  pay(req,res){
    stripe.charges.create(req.body, postStripeCharge(res));
  },*/
  retrieve(req, res) {
    return Payment
      .findAll()
      .then((PaymentItem) => {
        if (!PaymentItem) {
          return res.send({
            "code":404,
            "success":"Payment do not match"
          });
        }
    //console.log("lalaal");
        return res.send({
            "code":200,
            "success":"Payment find sucessfull",
            "Payment":PaymentItem
          });
      })
      .catch((error) => {return res.send({
            "code":404,
            "success":error
          });});
  },
  paymentEmail(req, res) {
    var target = req.params.email;
    var msg = req.body.emailmsg;
    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'catherine18yu@gmail.com', // your username
            pass: 'Whxnylg1994' //your password
        }
    });
    // Message object
    const mailOptions = {
      from: 'catherine18yu@gmail.com', // !!!!!! must keep the same with above
      to: target, // list of receivers
      subject: 'Payment confirmation', // Subject line
      html: '<p>'+ msg +'</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err)
       else
         console.log(info);
    });



    return res.send({
            "code":200,
            "success":"email"
          });
  },
};
