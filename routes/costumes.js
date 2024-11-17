var express = require('express');
const costume_controlers = require('../controllers/costume');
var router = express.Router();

// GET route for displaying all costumes
router.get('/', costume_controlers.costume_view_all_Page);
router.get('/costumes/:id', costume_controlers.costume_detail);
// POST route for creating a new costume
router.post('/', costume_controlers.costume_create_post);
router.put('/costumes/:id', costume_controlers.costume_update_put);

router.delete('/costumes/:id', costume_controlers.costume_delete);

/* GET detail costume page */
router.get('/detail', costume_controlers.costume_view_one_Page);


module.exports = router;
