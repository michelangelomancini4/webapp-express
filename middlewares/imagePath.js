// creo funzione per gestire il path assoluto delle immagini

function setImagePath(req, res, next) {

    req.imagePath = `${req.protocol}://${req.get('host')}/movies_cover/`;
    next()
}

module.exports = setImagePath;