import { Router } from "express";
import bcrypt from "bcrypt";
import { usuariosModelo } from "../models/usuarios.model.js";

export const router = Router();

/**
 * Genera un hash seguro a partir de una contraseña en texto plano
 * @param {string} password - Contraseña en texto plano
 * @returns {string} - Contraseña encriptada
 */

const createPassHash = (password) => {
  const saltRounds = 10; // Nivel de seguridad (entre mayor, más lento pero más seguro)
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

/**
 * Compara una contraseña en texto plano con un hash almacenado
 * @param {string} plainPassword - Contraseña ingresada por el usuario
 * @param {string} hashedPassword - Contraseña hasheada almacenada en la BD
 * @returns {boolean} - true si las contraseñas coinciden
 */

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// Ruta para login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Validar campos requeridos
  if (!email || !password) {
    return res.status(400).json({ error: "Complete email y password" });
  }
  try {
    // Buscar usuario por email
    const usuario = await usuariosModelo.findOne({ email });

    if (!usuario) {
      return res
        .status(400)
        .json({ error: `No existen usuarios con email ${email}` });
    }
    // Validar contraseña
    if (!validatePassword(password, usuario.password)) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }
    console.log(`Login correcto para usuario ${email}`);
    return res.status(200).json({
      status: "Login correcto...!!!",
      payload: usuario,
    });
  } catch (err) {
    console.error("Error en /login:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para registro de usuarios
router.post("/registro", async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  // Validar campos requeridos
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: "Faltan datos...!!!" });
  }
  try {
    // Verificar si ya existe un usuario con ese email
    const existe = await usuariosModelo.findOne({ email });
    if (existe) {
      return res
        .status(400)
        .json({ error: `Ya existen usuarios con email ${email} en la BD` });
    }
    // Crear nuevo usuario
    const nuevoUsuario = await usuariosModelo.create({
      nombre,
      apellido,
      email,
      password: createPassHash(password),
    });
    console.log(`Se registró OK el usuario ${nombre} ${apellido}`);
    return res.status(200).json({ nuevoUsuario });
  } catch (err) {
    console.error("Error en /registro:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});
