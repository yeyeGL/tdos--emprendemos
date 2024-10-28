import { Router } from "express";
import multer from "multer";
import {
  login,
  register,
  createProducts,
  editProduct,
  deleteProduct,
  chat,
  getProductsByCategory
} from "../controllers/user.controllers.js";

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

router.post("/login", login);
router.post("/register", register);
router.post("/products", upload.single('image'), createProducts); 
router.put("/products/:id", upload.single('image'), editProduct); 
router.delete("/products/:id", deleteProduct);
router.get("/products/category/:category", getProductsByCategory);
router.post("/chat", chat);


export default router;
