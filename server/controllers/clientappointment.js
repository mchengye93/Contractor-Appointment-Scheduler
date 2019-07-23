
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ClientAppointment = require('../models').ClientAppointment;

module.exports = {

  /*create new appointdate*/
  create(req, res) {

    	var currdatetime = new Date();
        return ClientAppointment
          .create({
    		    startdate: req.body.startdate,
    		    enddate: req.body.enddate,
    		    dateId: req.params.userid,
            appointmentId: req.params.appointmentId,
            clientId: req.params.clientId,
          })
          .then((ClientAppointment) => {
            if (!ClientAppointment) {
              return res.send({
                "code":404,
                "success":"Appointment build fail!"
              });
            }
            return res.send({
                "code":200,
                "success":"Appointment build success"
              });
          })
          .catch(error => {
    		    return res.send({
    			     "code":404,
    			     "success":"Appointment build fail!"
    		    });
    	    });
  },

  /*update appoint date*/
  update(req, res) {
    return ClientAppointment
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(ClientAppointment => {
        if (!ClientAppointment) {
            return res.send({
              "code":404,
              "success":"Date Edit fail!"
            });
        }

        return ClientAppointment
          .update({
			         startdate: req.body.startdate || ClientAppointment.startdate,
		           enddate: req.body.enddate || ClientAppointment.enddate,
          })
          .then(updatedClientAppointment => {
			         if (!updatedClientAppointment) {
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
    return ClientAppointment.findAll(
      {
      where: {
        dateId:{[Op.in]:[4,3]} ,
      },
    })
      .then(ClientAppointment => {
        if (ClientAppointment) {
          return res.send({
            "code":404,
            "success":"Date2",
            "data":ClientAppointment

          });

        }

      })

  },
  /*delete note*/
  destroy(req, res) {
    return ClientAppointment
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(ClientAppointment => {
        if (!ClientAppointment) {
          return res.send({
            "code":404,
            "success":"Date lalal fail!"
          });
        }

        return ClientAppointment
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
};
