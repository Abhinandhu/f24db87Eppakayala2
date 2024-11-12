var express = require('express');
const costume_controlers = require('../controllers/costume');
var router = express.Router();

// GET route for displaying all costumes
router.get('/', costume_controlers.costume_view_all_Page);
// POST route for creating a new costume
router.post('/', costume_controlers.costume_create_post);

module.exports = router;
