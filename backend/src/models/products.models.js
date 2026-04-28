// 
class Product {
    constructor(id, nombre, descripcion, categoria, precio, imagen, instock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.instock = instock;
    }
}

module.exports = Product;
