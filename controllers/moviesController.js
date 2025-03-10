// importazione menu
const { json } = require('express');
// const menu = require('../data/postsarray');

// importo db 
const connection = require('../data/db');

// logica INDEX
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
};

// logica  SHOW
function show(req, res) {

    const id = parseInt(req.params.id)

    // preparo la query 
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // Preparo la query per gli ingredienti con dati del presi dal database
    const ingredientsSql = `
    SELECT tags.label
    FROM tags 
    JOIN post_tag  ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
    `;
    // Eseguo la prima query 

    connection.query(postSql, [id], (err, postResults) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: 'Post not found' });

        // Recupero il post
        const post = postResults[0];

        // Se è andata bene, eseguo la seconda query per gli ingredienti
        connection.query(ingredientsSql, [id], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo gli ingredienti al post
            post.ingredients = ingredientsResults;
            res.json(post);
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

    //Eliminiamo il post dal menu
    connection.query('DELETE FROM movies WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete movie' });
        res.sendStatus(204)
    });

}

// esportiamo tutto
module.exports = { index, show, destroy }


