const Rate = require('../models').Rate;
const User = require('../models').User;
module.exports = {
  /*create new note*/
  create(req, res) {
    return Rate
    .create({
      rating: req.params.rating,
      dateId: req.params.dateId,
      fromUserId: req.params.fromUserId,
      toUserId:req.params.toUserId,
      review: req.params.review,
    })
    .then((rateItem) => {
      if (!rateItem) {
        return res.send({
          "code":404,
          "success":"Rate build fail!"
        });
      }
      return res.send({
        "code":200,
        "success":"Rate build success"
      });
    })
    .catch(error => {
      return res.send({
        "code":404,
        "success":"Note build fail!"
      });
    });
  },



  retrieve(req, res) {
    return Rate
    .findAll({
      where:{
        toUserId:req.params.userId,
      } })
    .then((rateItem) => {
      if (!rateItem) {
        return res.send({
          "code":404,
          "success":"Rate do not match"
        });
      }

      var rateAvg;
      Rate.count().then(Rate => {
        console.log("There are "+Rate+ " Rate items");
      })
      //Rate.sum('Rate').then(sum => {

      //})
      //var avg = rq.params.toUserId;
      //console.log("RATE: ",Rate.length);
      // calc avg rating
      var total = 0;
      var avg = 0;
      var i = 0;
      rateItem.forEach(function(item) {
        console.log("Item: ",item.dataValues);
        total += item.dataValues.rating;
        console.log("Total: ", total);
        i++;
      });
      avgerageRating = total/i;
      console.log(avg);
      // axio.get
      /*Rate.findAll({
      attributes:{
      include:[
      [sequelize.fn('AVG',sequelize.col('rating')),'rating_AVG']
    ]
  },
  group: ['toUserId']
})*/
return res.send({
  "code":200,
  "success":"BOOM rate find sucessfull",
  "rate":rateItem,
  "rateAvg": avgerageRating,
});
})
.catch((error) => {return res.send({
  "code":404,
  "success":error
});});
},

average(req, res) {
  return Rate
  .findAll({
    where:{
      toUserId:req.params.toUserId,
    } })
    .then((rateItem) => {
      if (!rateItem) {
        return res.send({
          "code":404,
          "success":"Rate do not match"
        });
      }
      var rateAvg;

      var total = 0;
      var avg = 0;
      var i = 0;
      rateItem.forEach(function(item) {
        console.log("Item: ",item.dataValues);
        total += item.dataValues.rating;
        console.log("Total: ", total);
        i++;
      });
      avg = total/i;
      console.log(avg);

      return User
      .findById(req.params.toUserId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
        .update({
          rating: avg.toFixed(2),
        })
        .then(() => {
          return res.send({
            "code":200,
            "success":"Update user rating sucessfull",
          });
        })
        .catch((error) => {
          return res.send({
            "code":404,
            "success":"Update user rating fail",
          });
        });
      })
      .catch((error) => {
        return res.send({
          "code":404,
          "success":"Update fail",
        });
      });

      return res.send({
        "code":200,
        "success":"BOOM rate find sucessfull",
        "user:": req.params.toUserId,
        "rateAvg": avg,
      });
    })
    .catch((error) => {return res.send({
      "code":404,
      "success":error
    });});
  },

};
