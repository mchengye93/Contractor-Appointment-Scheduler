const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const appointment = require('../models').appointment;

module.exports = {
  /*create new appointdate*/
  create(req, res) {
    var newappoint =new appointment();
    return appointment
      .create({
		    startTime: req.body.startTime,
		    endTime: req.body.endTime,
		    userId: req.params.userId,
        clientId: req.params.clientId,
      })
      .then((appointment) => {
        if (!appointment) {
          return res.send({
            "code":404,
            "success":"appointment build fail!"
          });
        }
        return res.send({
            "code":200,
            "success":"appointment build success"
          });
      })
      .catch(error => {
    		return res.send({
    			"code":404,
    			"success":"appointment build fail!"
    		});
	   });
  },
}
