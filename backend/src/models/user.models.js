import { pool } from "../config/db.js";

const newuser = async (name, email, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error);
    throw new Error("Error al crear nuevo usuario");
  }
};

const findByEmail = async (email) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw new Error("Error al buscar usuario por email");
  }
};

const createProduct = async (title, description, price, category, image_url) => {
  try {
    const result = await pool.query(`
        INSERT INTO products (title, description, price, category, image_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [title, description, price, category, image_url]); 

    return result.rows[0]; 
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error("Error al crear el producto");
  }
};

const editProduct = async (id, title, description, price, category, image_url) => {
  try {
    const result = await pool.query(`
        UPDATE products
        SET title = $1, description = $2, price = $3, category = $4, image_url = $5
        WHERE id = $6
        RETURNING *
    `, [title, description, price, category, image_url, id]);

    if (result.rows.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw new Error("Error al editar el producto");
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await pool.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw new Error("Error al eliminar el producto");
  }
};

const createChat = async (text, sender, user_id) => {
  try {
    const result = await pool.query(`
      INSERT INTO chats (text, sender, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [text, sender, user_id]);

    return result.rows[0]; 
  } catch (error) {
    console.error("Error al crear el chat:", error);
    throw new Error("Error al crear el chat");
  }
};

const findByCategory = async (category) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE category = $1`, [
      category,
    ]);
    return result.rows; 
  } catch (error) {
    console.error("Error al buscar productos por categoria:", error);
    throw new Error("Error al buscar productos por categoria");
  }
};




export const UserModel = {
  newuser,
  findByEmail,
  createProduct,
  editProduct,
  deleteProduct,
  createChat,
  findByCategory
};
