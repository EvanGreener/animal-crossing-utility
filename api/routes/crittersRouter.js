const express = require('express')
const router = express.Router()
const acCtrlr = require('../controllers/acController')

/* GET home page. */
// router.get(function(req, res, next) {
//   res.render("index", { title: "Express" });
// });
router.get(acCtrlr.getObtainableCrittersByType)

module.exports = router
