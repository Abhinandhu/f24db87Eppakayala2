var express = require('express');
var router = express.Router();
const api_controller = require('../controllers/api');
const costume_controller = require('../controllers/costume');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// API base route
router.get('/', api_controller.api);

// Costume routes
router.post('/costumes', costume_controller.costume_create_post);
router.delete('/costumes/:id', costume_controller.costume_delete);
router.put('/costumes/:id', costume_controller.costume_update_put);
router.get('/costumes/:id', costume_controller.costume_detail);
router.get('/costumes', costume_controller.costume_list);

module.exports = router;
