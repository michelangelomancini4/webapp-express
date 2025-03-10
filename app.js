// console log di prova
console.log('app.js si  avvia correttamente!');

// importazione express
const express = require('express')

// inizializzazione express
const app = express()

// middleware per json
app.use(express.json());

// importo array con menu
// const menu = require('./data/postsarray');

// importo il middleware per eventuali endpoint inesistenti
const checkInexistentEndpoint = require('./middlewares/inexistentEndpoint');

// importo il middleware per generare messaggio di errore
const genErrorMsg = require('./middlewares/errorMiddleware');




// Importazione routers/movies.js
const moviesRouter = require('./routers/movies');

//registrazione path delle rotte e istanza router
app.use('/movies', moviesRouter);

// impostazione porta
const port = 5000

// configurazione asset statico
app.use(express.static('public'));


// impostazione rotta principale
app.get('/', (req, res) => {
    res.send('rotta della HOME!!!')
})



// uso middleware nel caso si inseriscano endpoint inesistenti
app.use(checkInexistentEndpoint);

// uso middleware per generare messaggio d'errore
app.use(genErrorMsg);


// avvio server mettendolo in ascolto sulla porta indicata
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta: ${port}`)
})



