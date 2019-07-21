/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Switch = require('./model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Switch.find().then((Switch) => {
  //   SwitchList = Switch;
      res.render('index', { title: 'Smart' ,switch: SwitchList});
// })
});

// // Create an Switch and Save
// router.post('index',function(req,res,next){
//   const button = new Switch({
//     switch: req.body.switch || "Untitled Switch",
//     temperature: req.body.temperature,
//     volume: req.body.volume
//   });
//   button.save()
//       .then(res.redirect('index'));
//       });

//  //  Update the Switch
router.post('/savechanges', function (req, res) {
  Switch.findByIdAndUpdate(req.params.id, {
    switch: req.body.switch ,
    temperature: req.body.temperature,
    volume: req.body.volume
  }, { new: true, useFindAndModify: false }, (err) => {
    if (err) throw (err);
  }).then(res.redirect('index'));
});       

// // Deletes the Switch     
//   router.delete('index/delete/:id', function (req, res, next) {
//       Switch.findByIdAndDelete(req.params.id,{ useFindAndModify: false }, (err) => {
//           if (err) throw (err);
//         })
//       .then(res.redirect(500, 'index'));
//   });

  
module.exports = router;
