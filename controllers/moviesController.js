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

// logica  STORE - inserimento nuova recensione film
function storeReview(req, res) {

    // estrapolo id dai parametri
    const { id } = req.params;

    // estrapolo i dati che mi interessano dal req.body
    const { text, name, vote } = req.body;

    // creo costante per inserire i nuovi valori nel database
    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    // Esecuzione della query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });


}



// logica  STORE movie - inserimento nuovo film con tutti i dati
function store(req, res, next) {

    // estrapolo i dati che mi interessano dal req.body
    const { title, director, image, abstract, genre, release_year } = req.body;

    // gestisco il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creo la query con insert
    const query = "INSERT INTO movies (title, director, image, abstract, genre , release_year) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(query,
        [title, director, imageName, abstract, genre, release_year],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Internal server error"));
            }

            res.status(201).json({
                status: "success",
                message: "film aggiunto con successo!",
            });
        })
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


module.exports = { index, show, storeReview, store }


// console log di prova
console.log('moviesController.js si avvia correttamente!');
