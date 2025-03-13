// importo express
const express = require('express')

// importo cors
const cors = require("cors");

// importo per gestire env
require('dotenv').config();

// importazioni middlewares
// importo il middleware per eventuali endpoint inesistenti
const checkInexistentEndpoint = require('./middlewares/inexistentEndpoint');

// importo il middleware per generare messaggio di errore
const genErrorMsg = require('./middlewares/errorMiddleware');

// importo il middleware di gestione del path immagini 
const imagePathMiddleware = require('./middlewares/imagePath');

// Importo routers/movies.js
const moviesRouter = require('./routers/movies');

// importo lista film
const movie = require('./controllers/moviesController');

// inizializzazione express
const app = express()

// impostazione porta
const port = process.env.PORT


// middleware per json
app.use(express.json());

// middleware per cors
app.use(cors({ origin: process.env.FE_APP }))

// registro il middleware di gestione del path immagini 
app.use(imagePathMiddleware);



//registrazione path delle rotte e istanza router
app.use('/movies', moviesRouter);

// ROTTE
// impostazione rotta principale
app.get('/', (req, res) => {
    res.send('rotta della HOME!!!')
})

// rotta per le schede di dettaglio film
app.get("/infofilm", movie.index);



// uso middleware nel caso si inseriscano endpoint inesistenti
app.use(checkInexistentEndpoint);

// uso middleware per generare messaggio d'errore
app.use(genErrorMsg);


// avvio server mettendolo in ascolto sulla porta indicata
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta: ${port}`)
})

// console log di prova
console.log('app.js si  avvia correttamente!');


