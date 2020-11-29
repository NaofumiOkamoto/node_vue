var express = require('express');
var router = express.Router();
const db = require("../models/index");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", async function(req, res, next) {
  try{
    const result = await db.task.findAll({});
    res.send(result);
  } catch (err){
    res.status(500).send(err);
  }
});

//create
router.post("/task", async function(req, res, next){
  try{
    const result = await db.task.create({
      taskname: req.body.task
    });
    res.send(result);
  } catch(err) {
    res.status(500).send(err);

  }
});

//Update
router.put("/task/:id", async function(req, res, next) {
  try {
    const result = await db.task.update(
      {
        taskname: req.body.task
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete
router.delete("/task/:id", async function(req, res, next) {
  try {
    const result = await db.task.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({
      result: result
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
