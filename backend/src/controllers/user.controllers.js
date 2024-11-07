import { UserModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// Validaciones de registro
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar que se completen todos los datos del registro
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan datos por rellenar" }); 
  }

  try {
    // Verificar que el email no este registrado
    const emailExisting = await UserModel.findByEmail(email);
    if (emailExisting) {
      return res.status(409).json({ message: "Este email ya esta en uso" });
    }

    // Encriptar la contraseña y guardarlo en la base de datos
    const hashPassword = await bcryptjs.hash(password, 10);
    const createUser = await UserModel.newuser(name, email, hashPassword);

    return res
      .status(201)
      .json({ message: "Usuario registrado con exito", user: createUser });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); 
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar que el usuario con el correo corrspondiente se encuentre
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT con el id del usuario y firmarlo con la clave secreta
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Usuario autenticado",
      token,
    });
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return res.status(500).json({ message: "Error al autenticar el usuario" });
  }
};
 
export const createProducts = async (req, res) => {
  const { title, description, price, category,user_id } = req.body;
  const image_url = req.file ? req.file.path : null; 
  
  try {
    const product = await UserModel.createProduct(title, description, price, category, image_url,user_id);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const product = await UserModel.editProduct(id, title, description, price, category);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await UserModel.deleteProduct(id);
    return res.status(200).json({ message: "Producto eliminado", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await UserModel.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const chat = async (req, res) => {
  const { text, sender, user_id } = req.body;

  try {
    // Crear un chat
    const createdChat = await UserModel.createChat(text, sender, user_id);

    return res.status(201).json({ message: "Chat creado con exito", chat: createdChat });
  } catch (error) {
    console.error("Error al crear el chat:", error);
    return res.status(500).json({ message: "Error al crear el chat" });
  }
};

export const chatBot = async (req, res) => {
  const { text, sender, user_id } = req.body;

  try {
    // Crear un chatBot
    const createdChat = await UserModel.createChatBot(text, sender, user_id);

    return res.status(201).json({ message: "ChatBot creado con exito", chat: createdChat });
  } catch (error) {
    console.error("Error al crear el chat:", error);
    return res.status(500).json({ message: "Error al crear el chat" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params; 
  try {
    const products = await UserModel.findByCategory(category);
    if (products.length === 0) {
      return res.status(404).json({ message: "No hay productos para esta categoria" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al buscar productos por categoria:", error);
    res.status(500).json({ message: "Error al buscar productos por categoria" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await UserModel.findOneByEmail(req.email);
    return res.status(200).json({ ok: true, message: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const getProductos = async (req, res) => {
  try {
    const suites = await SuiteModel.getAllSuites();
    return res.status(200).json({ ok: true, suites: suites });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};