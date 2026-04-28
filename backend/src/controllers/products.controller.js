import db from "../config/db.js";
// Controladores para productos
const getProductos = (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error en GET productos:", error);
            return res.status(500).json({ error: "Error al obtener los productos" });
        }
        res.json(resultados);
    });
};
// Controlador para crear un nuevo producto
const createProducto = (req, res) => {
    const { nombre, descripcion, categoria, precio, imagen, instock } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }
    // insertar producto con valores por defecto
    const sql = `INSERT INTO productos 
                (nombre, descripcion, categoria, precio, imagen, instock) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    // valores por defecto
    const values = [nombre, descripcion || null, categoria || null, precio, imagen || null, instock || 1];

    // Ejecutar la consulta
    db.query(sql, values, (error, resultado) => {
        if (error) {
            console.error("Error en INSERT:", error);
            return res.status(500).json({ 
                error: "Error al insertar el producto",
                detalle: error.message 
            });
        }
        // Devolver el ID del nuevo producto si se insertó correctamente
        res.status(201).json({
            mensaje: "Producto insertado correctamente",
            id: resultado.insertId
        });
    });
};

// exportar funciones
export { 
    getProductos, 
    createProducto 
};