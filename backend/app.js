import express from "express";
import cors from "cors";

// Importar las rutas
import productosRoutes from "./src/routes/products.routes.js";
import paypalRoutes from "./src/routes/paypal.routes.js";

const app = express();

// middleware para cors (Cross-Origin Resource Sharing)
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());           // Para leer req.body en JSON
app.use(express.urlencoded({ extended: true }));  // Para formularios
// Servir archivos estáticos como las imagenes que hay en el catalogo
app.use('/images', express.static('src/assets/images'));   // ajusta la ruta de las imagenes

// Todas las rutas de la API empiezan con /api
app.use('/api', productosRoutes);


// Ruta de prueba porque no salia 
app.get('/', (req, res) => {
    res.json({
        mensaje: "Servidor de Videojuegos funcionando correctamente",
        status: "OK",
        rutas_disponibles: ["/api/productos (GET)", "/api/productos (POST)"]
    });
});


// Al final de las rutas agregamos un middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        ruta: req.originalUrl,
        metodo: req.method
    });
});
app.use('/api/paypal', paypalRoutes); // Agrega las rutas de PayPal

export default app;