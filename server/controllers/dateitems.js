
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const DateItem = require('../models').DateItem;
const nodemailer = require('nodemailer');
module.exports = {
  /*create new appointdate*/
  create(req, res) {
	var currdatetime = new Date();
    return DateItem
      .create({
		    startdate: req.body.startdate,
		    enddate: req.body.enddate,
		    dateId: req.params.userid,
        userGotRated: 0,
        clientGotRated: 0,
      })
      .then((dateItem) => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date build fail!"
          });
        }
        return res.send({
            "code":200,
            "success":"Date build success"
          });
      })
      .catch(error => {
    		return res.send({
    			"code":404,
    			"success":"Date build fail!"
    		});
	   });
  },
  /*update appoint date*/
  update(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
			      startdate: req.body.startdate || dateItem.startdate,
		          enddate: req.body.enddate || dateItem.enddate,
          })
          .then(updatedDateItem => {
			if (!updatedDateItem) {
			  return res.send({
				"code":404,
				"success":"Date update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Date update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
  },
  /*update appoint date*/
  updateClient(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
			      msg: req.body.msg || dateItem.msg,
		          clientid: req.params.clientid || dateItem.clientid,
          })
          .then(updatedDateItem => {
			if (!updatedDateItem) {
			  return res.send({
				"code":404,
				"success":"Date update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Date update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
  },
  /*update appoint date*/
  updateUserDate(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
		          clientid: req.params.clientid || dateItem.clientid,
              msg:'',
          })
          .then(updatedDateItem => {
			if (!updatedDateItem) {
			  return res.send({
				"code":404,
				"success":"Date update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Date update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
  },
  retrieve(req, res) {
    return DateItem.findAll()
      .then(dateItem => {
        if (dateItem) {
          return res.send({
            "code":404,
            "success":"Date2",
            "data":dateItem

          });

        }

        })

  },
  /*delete note*/
  destroy(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date lalal fail!"
          });
        }

        return dateItem
          .destroy()
          .then(() => {
            return res.send({
            "code":200,
            "success":"Date del success"
          });
         })
          .catch(error => {
            return res.send({
            "code":404,
            "success":"Date del fail!"
            });
        });
      })
      .catch(error => {
        return res.send({
            "code":404,
            "success":"Date del fail!"
            });
    });
  },
  updatePaid(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateId,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
		          isPaid: true,
          })
          .then(updatedDateItem => {
			if (!updatedDateItem) {
			  return res.send({
				"code":404,
				"success":"Date update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Date update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
  },
  updateUserRate(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateId,

        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }
        return dateItem
          .update({
              userGotRated: req.params.userGotRated,
          })
          .then(updatedDateItem => {
      if (!updatedDateItem) {
        return res.send({
        "code":404,
        "success":"Date update fail!"
        });
      }
      return res.send({
        "code":200,
        "success":"Date update success"
        });
    })
          .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
      })
      .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
  },
  updateClientRate(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateId,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }
        return dateItem
          .update({
            clientGotRated: req.params.clientGotRated,
          })
          .then(updatedDateItem => {
      if (!updatedDateItem) {
        return res.send({
        "code":404,
        "success":"Date update fail!"
        });
      }
      return res.send({
        "code":200,
        "success":"Date update success"
        });
    })
          .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
      })
      .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
  },

  postEmail(req, res) {
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
      subject: 'you have a new booking', // Subject line
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
