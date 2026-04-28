
// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message
    });
};

module.exports = errorHandler;