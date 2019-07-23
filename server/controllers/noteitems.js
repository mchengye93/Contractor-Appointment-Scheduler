const NoteItem = require('../models').NoteItem;

module.exports = {
  /*create new note*/
  create(req, res) {
	var currdatetime = new Date();
    return NoteItem
      .create({
		    title: req.body.title,
        content: req.body.content,
		    builddate:currdatetime,
		    noteId: req.params.userid,
      })
      .then((noteItem) => {
        if (!noteItem) {
          return res.send({
            "code":404,
            "success":"Note build fail!"
          });
        }
        return res.send({
            "code":200,
            "success":"Note build success"
          });
      })
      .catch(error => {
		return res.send({
			"code":404,
			"success":"Note build fail!"
		  });
	});
  },
  /*update note*/
  update(req, res) {
    return NoteItem
      .find({
        where: {
          id: req.params.noteid,
          noteId: req.params.userid,
        },
      })
      .then(noteItem => {
        if (!noteItem) {
          return res.send({
            "code":404,
            "success":"Note Edit fail!"
          });
        }

        return noteItem
          .update({
            title: req.body.title || noteItem.title,
            content: req.body.content || noteItem.content,
          })
          .then(updatedNoteItem => {
			if (!updatedNoteItem) {
			  return res.send({
				"code":404,
				"success":"Note update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Note update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Note build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Note build fail!"
				  });
			});
  },
  /*delete note*/
  destroy(req, res) {
    return NoteItem
      .find({
        where: {
          id: req.params.noteid,
          noteId: req.params.userid,
        },
      })
      .then(noteItem => {
        if (!noteItem) {
          return res.send({
            "code":404,
            "success":"Note lalal fail!"
          });
        }

        return noteItem
          .destroy()
          .then(() => {
            return res.send({
            "code":200,
            "success":"Note del success"
          });
         })
          .catch(error => {
            return res.send({
            "code":404,
            "success":"Note del fail!"
            });
        });
      })
      .catch(error => {
        return res.send({
            "code":404,
            "success":"Note del fail!"
            });
    });
  },
};
