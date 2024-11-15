var Costume = require('../models/costume');
exports.costume_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume list');
};
// exports.costume_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
// };
exports.costume_detail = async function(req, res) {
    console.log("detail" + req.params.id); // Log the ID to verify
    try {
        // Use findById to fetch the costume by ID from the database
        let result = await Costume.findById(req.params.id);
        res.send(result); // Send the costume details as JSON
    } catch (error) {
        res.status(500); // Send an error status if not found
        res.send(`{"error": "Document for id ${req.params.id} not found"}`);
    }
};
exports.costume_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume create POST');
};
exports.costume_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};
// exports.costume_update_put = function(req, res) {
//     res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
// };
// Handle Costume update form on PUT.
exports.costume_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`); // Log request details
    try {
        // Find the costume by ID
        let toUpdate = await Costume.findById(req.params.id);

        // Update the costume properties if they are provided in the request body
        if (req.body.costume_type) toUpdate.costume_type = req.body.costume_type;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        if (req.body.size) toUpdate.size = req.body.size;
        if (req.body.checkboxsale) toUpdate.sale = true;
        else toUpdate.sale = false;

        // Save the updated document
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result); // Send the updated document as JSON
    } catch (err) {
        res.status(500); // Internal server error status code
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }
};

exports.costume_list = async function(req, res) {
    try {
        const theCostumes = await Costume.find();
        res.json(theCostumes); // Send the documents as JSON
    } catch (err) {
        res.status(500); // Internal server error status code
        res.send(`{"error": ${err}}`); // Send error message if failed
    }
};

exports.costume_view_all_Page = async function(req, res) {
    try {
        const theCostumes = await Costume.find();
        res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Costume create on POST.
exports.costume_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Costume();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.costume_type = req.body.costume_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
    