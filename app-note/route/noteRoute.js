var express = require('express');
var nodeController  = require('../controller/noteController');

const router = express.Router();

router.get('/notes',nodeController.getAllNotes)
router.post('/notes/save',nodeController.saveNotes)
router.put('/notes/update',nodeController.updateNote)
router.delete('/notes/delete/:noteId',nodeController.deleteNotes)

module.exports = router ; 