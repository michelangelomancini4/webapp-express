const express = require('express')
const router = express.Router();

// importo il controller
const moviesController = require('../controllers/moviesController');

// rotte per le operazioni CRUD 

// INDEX 
router.get('/', moviesController.index);

// SHOW
router.get('/:id', moviesController.show);


// STORE (per aggiungere nuove recensioni)
router.post('/:id/reviews', moviesController.storeReview);

// UPDATE
router.put('/:id');

// DESTROY
router.delete('/:id');


// esporto router
module.exports = router;

// console log di prova
console.log('movies.js si avvia correttamente!');

