var express = require('express');
var storeController  = require('../controller/storeController');

const router = express.Router();

router.get('/stores',storeController.getStoreList)
router.post('/stores/save',storeController.saveStore)
// router.put('/notes/update',nodeController.updateNote)
// router.delete('/notes/delete/:noteId',nodeController.deleteNotes)

module.exports = router ; 