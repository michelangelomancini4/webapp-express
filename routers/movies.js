const express = require('express')
const router = express.Router();

// importo il controller
const moviesController = require('../controllers/moviesController');

// importo middelware per la gestione file
const upload = require('../middlewares/multer');

// rotte per le operazioni CRUD 

// INDEX 
router.get('/', moviesController.index);

// SHOW
router.get('/:id', moviesController.show);


// STORE REVIEW (per aggiungere nuove recensioni)
router.post('/:id/reviews', moviesController.storeReview);

// STORE MOVIE
router.post('/', upload.single('image'), moviesController.store);

// UPDATE
router.put('/:id');

// DESTROY
router.delete('/:id');


// esporto router
module.exports = router;

// console log di prova
console.log('movies.js si avvia correttamente!');

