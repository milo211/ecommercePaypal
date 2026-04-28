import mysql from "mysql2";
import "dotenv/config";

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar a la base de datos
conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar MySQL", error);
        return;
    }
    console.log("Conexion exitosa");
});
// Exportar la conexión para usarla en otros archivos
export default conexion;
