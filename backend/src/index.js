import app from "./app.js";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Para hacer pruebas de products
// {
//     "title": "Titulo 1",
//     "description": "Descripcion 1",
//     "price": 10000,
//     "category": "Producto",
//     "image_url": "https://imagen/imagen.jpg"
// }

// Para hacer pruebas de register
// {
//     "name": "Nombre 1",
//     "email": "correo1@gmail.com",
//     "password": "123456"
// }

// Para hacer pruebas de login
// {
//     "email": "correo1@gmail.com",
//     "password": "123456"
// }