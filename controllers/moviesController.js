const { json } = require('express');

// importo db 
const connection = require('../data/db');

// logica INDEX
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    // eseguo la query per farmi ritornare la lista di tutti i film
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });


        // mappo il risultato per generare 'movie' che sarà aggiornato con la proprietà 'image'
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // se tutto funziona restituisco 'movies' aggiornato
        res.json(movies);
    })
};

// logica  SHOW
function show(req, res) {

    // recupero l'id
    const id = parseInt(req.params.id)

    // preparo la query per recuperare i dati del singolo film (prendo solo i dati db di movies)
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // Preparo la query per le reviews con dati del presi dal database (prendo solo i dati db di reviews)
    const reviewsSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
    `;


    // Eseguo la prima query 

    connection.query(movieSql, [id], (err, movieResults) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'movie not found' });



        // output con i dati del singolo film (solo con dati di movies)
        const movie = movieResults[0];

        // eseguo la query per recuperare i dati di reviews

        connection.query(reviewsSql, [id], (err, reviewResults) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorno i dati del film con l'aggiunta dei dati di review

            movie.reviews = reviewResults

            // aggiorno i dati del film con l'aggiunta delle immagini

            movie.image = req.imagePath + movie.image

            // ritorno i dati del film aggiornati
            res.json(movie);

        });



    });

}

// logica  STORE
function store(req, res) {



}


//  logica UPDATE
function update(req, res) {



}

// logica  DESTROY
function destroy(req, res) {

    // conversione ID da stringa a numero con parseInt
    const id = parseInt(req.params.id)

    //Elimino dalla lista film
    connection.query('DELETE FROM movies WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete movie' });
        res.sendStatus(204)
    });

}

// esportiamo tutto
module.exports = { index, show, destroy }


// console log di prova
console.log('moviesController.js si avvia correttamente!');
