var express = require('express');
var router = express.Router();
var db = require("../repository/repo")



/* GET home page. */
router.get('/', async function(req, res, next) {
  let results = await db.findAll()
  console.log({ title: 'Express', results });
  res.render('index', { title: 'Express', results });
});

router.get('/home', async function(req, res, next) {
  let results = await db.findAll()
  console.log({ title: 'Express', results });
  res.render('home', { title: 'home', results });
});


module.exports = router;
