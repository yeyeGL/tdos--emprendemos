import { Router } from "express";
import multer from "multer";
import {
  login,
  register,
  createProducts,
  editProduct,
  deleteProduct,
  chat
} from "../controllers/user.controllers.js";

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/products", upload.single('image'), createProducts); 
router.put("/products/:id", upload.single('image'), editProduct); 
router.delete("/products/:id", deleteProduct);
router.post("/chat", chat);

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

export default router;
