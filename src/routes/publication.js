const express = require('express');
const Publication = require('../controllers/publication');
const router = express.Router();

router.post('/', Publication.createPublication);
router.get('/', Publication.findAllPublications);
router.get('/:id', Publication.findPublicationById);
router.put('/:id', Publication.updatePublication);
router.delete('/:id', Publication.deletePublication);
// find Publication by commerce 

module.exports = router;
