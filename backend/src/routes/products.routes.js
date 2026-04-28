// Configuración de rutas para productos
import express from "express";
const router = express.Router();

// importación con verificación
import { getProductos, createProducto } from "../controllers/products.controller.js";

console.log("Controller importado:", { getProductos: typeof getProductos, createProducto: typeof createProducto }); // para ver que se hallan importado las funciones correctamente

// Verificamos que las funciones existan
if (typeof getProductos !== 'function') {
    console.error("Error: getProductos no es una función");
}

if (typeof createProducto !== 'function') {
    console.error("rror: createProducto no es una función");
}

// Rutas
router.get("/productos", getProductos);

router.post("/productos", createProducto || ((req, res) => {
    res.status(500).json({ error: "createProducto no está definido en el controlador" });
}));

export default router;